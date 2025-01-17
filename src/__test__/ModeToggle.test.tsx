// Components
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProviderState, useTheme } from '@/components/theme-provider'

// Utils
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

// Мокаем хук useTheme для имитации смены темы
jest.mock('@/components/theme-provider', () => ({
	useTheme: jest.fn(),
}))

// Общий блок для наглядности
describe('ModeToggle', () => {
	test('Render the ModeToggle', () => {
		// Настроим useTheme, чтобы вернуть текущую тему
		;(useTheme as jest.Mock<ThemeProviderState>).mockReturnValue({
			theme: 'light',
			setTheme: jest.fn(),
		})

		// Рендерим кнопку
		render(<ModeToggle />)

		// Проверяем, что кнопка отрендерилась
		expect(screen.getByTestId('mode-toggle-button')).toBeInTheDocument()
	})

	test('Change theme to dark when clicked in light mode', () => {
		// Мокаем состояние
		const setThemeMock = jest.fn()

		// Мокаем хук
		;(useTheme as jest.Mock<ThemeProviderState>).mockReturnValue({
			theme: 'light',
			setTheme: setThemeMock,
		})

		// Рендерим кнопку
		render(<ModeToggle />)

		// Кликаем по кнопке
		fireEvent.click(screen.getByTestId('mode-toggle-button'))

		// Проверяем, что setTheme был вызван с параметром 'dark'
		expect(setThemeMock).toHaveBeenCalledWith('dark')
	})

	test('Change theme to light when clicked in dark mode', () => {
		// Мокаем состояние
		const setThemeMock = jest.fn()

		// Мокаем хук
		;(useTheme as jest.Mock<ThemeProviderState>).mockReturnValue({
			theme: 'dark',
			setTheme: setThemeMock,
		})

		// Рендерим кнопку
		render(<ModeToggle />)

		// Кликаем по кнопке
		fireEvent.click(screen.getByTestId('mode-toggle-button'))

		// Проверяем, что setTheme был вызван с параметром 'light'
		expect(setThemeMock).toHaveBeenCalledWith('light')
	})
})
