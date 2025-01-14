import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Todo } from '@/store/todo'
import { Ellipsis } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { TypographyH3 } from '../ui/typography-h3'
import classes from './styles/app.module.scss'

export const App = observer(() => {
	const [page, setPage] = useState(1)
	const [isFetch, setIsFetch] = useState(true)
	const [startIdx, setStartIdx] = useState(1)
	const [limit, setLimit] = useState(35)

	const scrollHandler = (e: any) => {
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setIsFetch(true)
		}
	}

	useEffect(() => {
		if (!isFetch) return

		console.log("fetch");
		
		Todo.fetchTodos(startIdx, limit)
			.then(fetchedList => {
				if (!fetchedList) {
					return
				}

				const newList = [...Todo.list, ...fetchedList]

				Todo.setList(newList)
			})
			.finally(() => {
				setStartIdx(startIdx+ limit)
				setLimit(limit + 35)
				setIsFetch(false)
			})
	}, [isFetch])

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)

		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return (
		<div className={classes.container} onScroll={e => {}}>
			<TypographyH3 className={classes.title}>Тестовое задание 1</TypographyH3>
			<Table>
				<TableCaption>Список задач</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>
							<Checkbox />
						</TableHead>
						<TableHead>№</TableHead>
						<TableHead>Содержание</TableHead>
						<TableHead>Статус</TableHead>
						<TableHead>Действие</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Todo.list.map((todo, idx) => (
						<TableRow key={todo.id}>
							<TableCell>
								<Checkbox />
							</TableCell>
							<TableCell>{idx + 1}</TableCell>
							<TableCell>{todo.title}</TableCell>
							<TableCell>
								{todo.completed ? 'Выполнено' : 'Не выполнено'}
							</TableCell>
							<TableCell>
								<Button variant={'ghost'}>
									<Ellipsis />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
})
