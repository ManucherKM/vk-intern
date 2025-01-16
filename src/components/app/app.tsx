// Types
import type { ITodoItem } from '@/store/todo'
import type { ChangeEvent } from 'react'

// Components
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AnimatePresence } from 'motion/react'
import { TodoList } from '../todo-list/todo-list'
import { Input } from '../ui/input'

// Styles
import classes from './styles/app.module.scss'

// Utils
import { useFetchTodos } from '@/hooks/useFetchTodos'
import { useObserver } from '@/hooks/useObserver'
import { Todo } from '@/store/todo'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ModeToggle } from '../mode-toggle'
import { ThemeProvider } from '../theme-provider'
import { Toaster } from '../ui/toaster'

export type TSortVariant = 'A-Z' | 'Z-A'

export const App = observer(() => {
	const [isVisible, setIsVisible] = useState(true)
	const lastElRef = useRef(null)
	const { isLoading, fetchTodos } = useFetchTodos()
	const callIntersectionObserver = useObserver()
	const [search, setSearch] = useState('')

	const sortHandler = useCallback(
		(todos: ITodoItem[], variant: TSortVariant) => {
			if (variant === 'A-Z') {
				Todo.setList([...todos.sort((a, b) => a.title.localeCompare(b.title))])
			} else {
				Todo.setList([...todos.sort((a, b) => b.title.localeCompare(a.title))])
			}
		},
		[Todo.list, search],
	)

	function conditionHandler(todo: ITodoItem) {
		// Тут по хорошему нужно использовать алгоритм растояния Левенштейна для более "грамотного" поиска задач
		// Но для простоты (учитывая, что это тестовое задание, решил ограничиться поиском по подстроке).
		// Прим. насколько я понял вопросы касательно алгоритмов и структур данных будут на собесе
		if (todo.title.includes(search)) {
			return true
		}

		return false
	}

	function editHandler(id: number) {
		console.log(id)
	}

	function removeHandler(id: number) {
		Todo.removeTodo(id)
	}

	function searchHandler(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value)
	}

	useEffect(() => {
		if (!isVisible) return
		if (!!search.length) return

		fetchTodos()
	}, [isVisible])

	useEffect(() => {
		if (isLoading) return

		const observerHandler = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries

			setIsVisible(entry.isIntersecting)
		}

		return callIntersectionObserver(lastElRef, observerHandler)
	}, [lastElRef, isLoading])

	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Toaster />
				<AnimatePresence initial={false}>
					<div className={classes.container}>
						<TodoList
							title="Тестовое задание 1"
							caption="Список задач"
							cells={Todo.list}
							heads={['№', 'Содержание', 'Статус', 'Действие']}
							navigation={
								<div className={classes.table_navigation}>
									<div className="max-w-96 w-full">
										<Input
											placeholder="Поиск"
											value={search}
											onChange={searchHandler}
										/>
									</div>
									<div className="flex gap-2">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline">Сортировка</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-56">
												<DropdownMenuItem
													onClick={() => sortHandler(Todo.list, 'A-Z')}
												>
													A-Z
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => sortHandler(Todo.list, 'Z-A')}
												>
													Z-A
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
										<ModeToggle />
									</div>
								</div>
							}
							isEdit={true}
							onDelete={removeHandler}
							condition={conditionHandler}
						/>

						{isLoading && 'Загрузка...'}

						<div ref={lastElRef} />
					</div>
				</AnimatePresence>
			</ThemeProvider>
		</>
	)
})
