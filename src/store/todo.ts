// Utils
import { api } from '@/axios'
import { makeAutoObservable } from 'mobx'

export interface ITodoItem {
	userId: number
	id: number
	title: string
	completed: boolean
}

class TodoInit {
	list: ITodoItem[] = []

	constructor() {
		makeAutoObservable(this)
	}

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

	setList(target: ITodoItem[]) {
		this.list = target
	}
}

export const Todo = new TodoInit()
