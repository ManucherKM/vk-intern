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
		} catch (e) {
			console.error(e)
		}
	}

	setList(target: ITodoItem[]) {
		this.list = target
	}
}

export const Todo = new TodoInit()
