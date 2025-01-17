

import { App } from '../components/app/app'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('App', () => {
	test('App render #1', () => {
		render(<App />)

		expect(screen.getByTestId('app-container')).toBeTruthy()
	})
})
