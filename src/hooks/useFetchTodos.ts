// Utils
import { Todo } from '@/store/todo'
import { useState } from 'react'
import { useToast } from './use-toast'

// Вынес за пределы хука, чтобы не объявлялась по несколько раз при ререндерах хука
// Лимит всегда один, поэтому в данном случае мы можем это сделать
const limit = 20

// Хук для получения задач
export const useFetchTodos = () => {
	// Состояния загрузки задач
	const [isLoading, setIsLoading] = useState(false)

	const [startIdx, setStartIdx] = useState(0)
	const [totalCount, setTotalCount] = useState(0)
	const { toast } = useToast()

	return {
		isLoading,
		setIsLoading,
		fetchTodos: async function () {
			try {
				setIsLoading(true)

				if (startIdx >= totalCount && startIdx !== 0) {
					return
				}

				const res = await Todo.fetchTodos(startIdx, limit)

				const count = res?.headers['x-total-count']

				if (totalCount === 0 && !!count) {
					setTotalCount(count)
				}

				if (!res?.data?.length) {
					toast({
						title: 'Ошибка',
						description: 'Не удалось получить список задач',
						variant: 'destructive',
					})
					return
				}

				let newList = []

				// При повторных рендерах (было видно в дев режиме) конструкция [...Todo.list, ...res.data] создавала дублирующиеся объекты,
				// поэтому при добавлении новой пачки с задачами, мы проверяем не являются ли они дубликатами
				// Проверив любой объект на наличие в уже имеющемся массиве, мы делаем вывод, что пришедший массив не имеет дубликатов
				const foundIdx = Todo.list.findIndex(todo => todo.id === res.data[0].id)

				if (foundIdx === -1) {
					newList = [...Todo.list, ...res.data]
				} else {
					newList = res.data
				}

				Todo.setList(newList)

				setStartIdx(startIdx + limit)
			} catch (e) {
				console.log(e)

				toast({
					title: 'Ошибка',
					description: 'Не удалось получить список задач',
					variant: 'destructive',
				})
			} finally {
				setIsLoading(false)
			}
		},
	}
}
