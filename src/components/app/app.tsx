// Types
import type { TSortVariant } from '@/hooks/useSortTodos'
import type { ITodoItem, IUpdateTodo } from '@/store/todo'
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
import { ModeToggle } from '../mode-toggle'
import { ThemeProvider } from '../theme-provider'
import { TodoList } from '../todo-list/todo-list'
import { Input } from '../ui/input'

// Styles
import classes from './styles/app.module.scss'

// Utils
import { useFetchTodos } from '@/hooks/useFetchTodos'
import { useObserver } from '@/hooks/useObserver'
import { useSortTodos } from '@/hooks/useSortTodos'
import { Todo } from '@/store/todo'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from '../ui/toaster'

// Основной компонент на который установлен "observer" для ререндера при изменений данных в сторе
export const App = observer(() => {
	// Состояние отвечающее за видимость блока для получения новой порции задач
	// По умолчанию true т.к. при первом рендере список задач пустой и блок попад
	const [isVisible, setIsVisible] = useState(true)

	// Ссылка на элемент при видимости которого будет производиться запрос на получение новой порции данных
	const lastElRef = useRef(null)

	// Состояние загрузки задач и функция для их получения
	const { isLoading, fetchTodos } = useFetchTodos()

	// Функция для отслеживания элемента, когда он (элемент) оказывается в зоне видимости
	const callIntersectionObserver = useObserver()

	// Состояние для поиска задач
	const [search, setSearch] = useState('')

	// Функция которая кэширует отсортированый список задач
	const sortTodos = useSortTodos([Todo.list, search])

	// Функция которая отрабатывает при выборе метода сортировки
	function sortHandler(todos: ITodoItem[], variant: TSortVariant) {
		// Получаем отсортированый список
		const sortedTodos = sortTodos(todos, variant)

		// Изменяем список из стора на отсортированный
		Todo.setList(sortedTodos)
	}

	// Функция с условием, котрое влияет на рендер задачи, в нашем случае это условие отвечающее за поиск задачи
	function conditionHandler(todo: ITodoItem) {
		// Тут по хорошему нужно использовать алгоритм растояния Левенштейна для более "грамотного" поиска задач
		// Но для простоты (учитывая, что это тестовое задание, решил ограничиться поиском по подстроке).
		// Прим. насколько я понял вопросы касательно алгоритмов и структур данных будут на собесе
		if (todo.title.includes(search)) {
			return true
		}

		// Возвращаем false, тем самым не рендеря задачу
		return false
	}

	// Функция которая отрабатывает при изменении задачи
	function editHandler(prev: ITodoItem, update: IUpdateTodo) {
		// Изменяем задачу из метода стора
		Todo.editTodo(prev.id, update)
	}

	// Функция которая отрабатывает при удалении задачи
	function removeHandler(id: number) {
		// Удаляем задачу из метода стора
		Todo.removeTodo(id)
	}

	// Функция которая отрабатывает при изменении значения инпута
	function searchHandler(e: ChangeEvent<HTMLInputElement>) {
		// Обновляем значение поиска
		setSearch(e.target.value)
	}

	// Эффект для получения списка задач
	useEffect(() => {
		// Если элемент-триггер в зоне просмотра пользователя
		if (!isVisible) return

		// Если мы не используем поиск
		if (!!search.length) return

		// Запрашиваем новую порцию задач
		fetchTodos()
	}, [isVisible])

	// Эффект для отслеживания элемента-триггера, для подгрузки новой партии задач
	useEffect(() => {
		// Если мы не в режиме загрузки списка задач
		if (isLoading) return

		// Функция которая будет передаваться как коллбек при отслеживании элемента-триггера
		const observerHandler = (entries: IntersectionObserverEntry[]) => {
			// Получаем 1й отслеживаемый элемент (у нас их всего 1)
			const [entry] = entries

			// Изменяем состояние видимости элемента-триггера
			setIsVisible(entry.isIntersecting)
		}

		// Вызываем функцию для отслеживания элемента. Функция возвращает коллбэк для того,
		// чтобы прекратить отслеживание элемента-триггера при демонтировании компонента
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
							onEdit={editHandler}
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
