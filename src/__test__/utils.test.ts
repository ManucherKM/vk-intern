// Utils
import { cn } from '@/lib/utils'

// Обернул в общий блок для удобства
// Тут очень простые тесты, поэтому думаю, что объяснения не нужны
describe('Utils', () => {
	test('Regular string splicing.', () => {
		expect(cn('1', '2')).toBe('1 2')
	})

	test('Splitting a string with a condition #1', () => {
		expect(cn('1', false && '2')).toBe('1')
	})

	test('Splitting a string with a condition #2', () => {
		expect(cn('1', true && '2')).toBe('1 2')
	})
})
