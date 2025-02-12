// Types
import type { ITodoItem } from '@/store/todo'
import type { DependencyList } from 'react'

// Utils
import { useCallback } from 'react'

// Тип для вариантов сортировки
export type TSortVariant = 'A-Z' | 'Z-A' | '№ ↑' | '№ ↓'

// Хук для сортировки списков задач
export const useSortTodos = (deps: DependencyList) => {
	return useCallback((todos: ITodoItem[], variant: TSortVariant) => {
		if (variant === 'A-Z') {
			return [...todos.sort((a, b) => a.title.localeCompare(b.title))]
		} else if (variant === 'Z-A') {
			return [...todos.sort((a, b) => b.title.localeCompare(a.title))]
		} else if (variant === '№ ↑') {
			return [...todos.sort((a, b) => b.id - a.id)]
		} else {
			return [...todos.sort((a, b) => a.id - b.id)]
		}
	}, deps)
}
