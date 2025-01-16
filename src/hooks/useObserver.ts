// Utils
import { MutableRefObject } from 'react'

// Хук для отслеживания узла, когда он (узел) оказывается в поле видимости
export const useObserver = () => {
	// Возвращяем функцию, чтобы использовать функционал тогда, когда нам нужно, а не при первом рендере, как например произошло бы
	// в теле хука.
	return function (
		ref: MutableRefObject<null | undefined>,
		callback: IntersectionObserverCallback,
		options?: IntersectionObserverInit,
	) {
		// Если ветки нет - прерываем функцию
		if (!ref.current) return

		// Создаем класс для отслеживания и передаем в него коллбэк который будет отрабатывать при появлении ветки на экране
		const observer = new IntersectionObserver(callback, options)

		// Передаем "отслеживатею" ветку для отслеживания
		observer.observe(ref.current)

		// Возвращаем коллбэк для удаления "отслеживателя" при демонтировании компонента (в useEffect)
		return () => {
			if (!ref.current) return

			observer.unobserve(ref.current)
		}
	}
}
