// Utils
import { api } from '@/axios'
import { makeAutoObservable } from 'mobx'

// Тут в идеале нужно JSDoc использовать, но для простоты решил ограничиться комментариями в проекте
export interface ITodoItem {
	id: number
	title: string
	completed: boolean
	userId: number
}

// Добавил приставку Init, чтобы новый класс экспортировать с более коротким, простым и понятным названием.
// В части с экспортом объяснил причину.
class TodoInit {
	// Список задач
	list: ITodoItem[] = []

	constructor() {
		// Делаем класс автоматически отслеживаемым
		makeAutoObservable(this)
	}

	// Запрос на получение задач
	async fetchTodos(_start: number, _limit: number) {
		try {
			const response = await api.get<ITodoItem[]>('todos', {
				params: {
					_start,
					_limit,
				},
			})

			return response

			// Полностью согласен, any, в большинстве случаев - это плохо и его нужно избегать,
			// но т.к. типов для Error нет (по крайней мере я не нашел, были только кейсы
			// с преобразованием через unknown и ключевое слово as, но это на кастыль какой-то похоже,
			// я посчитал, что данный кейс вполне можно посчитать за исключение)
		} catch (e: any) {
			console.error(e)

			// Пробрасываем ошибку на уровень выше, чтобы отлавливать ее в других блоках catch
			// Например для показа алерта в рамках хуков/компонентов, а не бизнесовой логики из стора
			throw new Error(e)
		}
	}

	// Метод для удаления (локально) задачи
	removeTodo(id: number) {
		// Этот участок можно оптимизировать алгоритмом бинарного поиска (первое что пришло в голову) т.к. задачи подтягиваются с апи по порядку (от меньшего id к большему)
		// Но для простоты решил ограничится циклом со сложностью O(n)
		const newTodos = this.list.filter(todo => todo.id !== id)

		// MobX позволяет напрямую изменять данные из стора, поэтому пользуемся этой возможностью
		this.list = newTodos
	}

	// Метод для изменения стора
	setList(target: ITodoItem[]) {
		// MobX позволяет напрямую изменять данные из стора, поэтому пользуемся этой возможностью
		this.list = target
	}
}

export const Todo = new TodoInit()
