// Types
import type { ReactNode } from 'react'

// Components
import { List } from '@/components/list'

// Мы мокаем это значение, поэтому не можем удалить
// @ts-ignore
import { AnimatePresence } from 'motion/react' 

// Utils
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Мокаем AnimatePresence, чтобы проверить поведение без реальной анимации
jest.mock('motion/react', () => ({
	AnimatePresence: ({ children }: { children: ReactNode }) => (
		<div>{children}</div>
	),
}))

// Общий блок для наглядности
describe('List', () => {
	// Рендерим список
	test('Render elements', () => {
		const arr = [1, 2, 3]

		const callback = (item: number) => <span key={item}>{item}</span>

		render(<List arr={arr} callback={callback} />)

		// Проверяем, что все элементы массива отрендерены
		expect(screen.getByText('1')).toBeInTheDocument()
		expect(screen.getByText('2')).toBeInTheDocument()
		expect(screen.getByText('3')).toBeInTheDocument()
	})

	test('Call callback for each element in the array with correct arguments', () => {
		const arr = [1, 2, 3]

		const callback = jest.fn(item => <span key={item}>{item}</span>)

		render(<List arr={arr} callback={callback} />)

		// Проверяем, что callback был вызван трижды (для каждого элемента массива)
		expect(callback).toHaveBeenCalledTimes(3)

		// Проверяем, что callback был вызван с правильными аргументами
		expect(callback).toHaveBeenCalledWith(1, 0, arr)
		expect(callback).toHaveBeenCalledWith(2, 1, arr)
		expect(callback).toHaveBeenCalledWith(3, 2, arr)
	})
})
