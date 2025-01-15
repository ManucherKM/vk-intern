import { MutableRefObject } from 'react'

export const useObserver = () => {
	return function (
		ref: MutableRefObject<null | undefined>,
		callback: IntersectionObserverCallback,
		options?: IntersectionObserverInit,
	) {
		if (!ref.current) return

		const observer = new IntersectionObserver(callback, options)

		observer.observe(ref.current)

		return () => {
			if (!ref.current) return

			observer.unobserve(ref.current)
		}
	}
}
