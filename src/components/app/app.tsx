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
import { observer, observerBatching } from 'mobx-react-lite'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { TypographyH3 } from '../ui/typography-h3'
import classes from './styles/app.module.scss'

const MotionRow = motion.create(TableRow)

export const App = observer(() => {
	const [isVisible, setIsVisible] = useState(true)
	const [startIdx, setStartIdx] = useState(0)
	const [limit, setLimit] = useState(20)
	const lastElRef = useRef(null)
	const [totalCount, setTotalCount] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				setIsLoading(true)
				if (!isVisible) {
					return
				}

				if (startIdx >= totalCount && startIdx !== 0) {
					return
				}

				const res = await Todo.fetchTodos(startIdx, limit)

				const count = res?.headers['x-total-count']

				if (totalCount === 0 && !!count) {
					setTotalCount(count)
				}

				if (!res?.data?.length) return

				const newList = [...Todo.list, ...res.data]

				Todo.setList(newList)

				setStartIdx(prev => prev + limit)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchTodos()
	}, [isVisible])

	function observerHandler(entries: IntersectionObserverEntry[]) {
		const [entry] = entries

		setIsVisible(entry.isIntersecting)
	}

	useEffect(() => {
		if (!lastElRef.current) return
		if (isLoading) return

		const observer = new IntersectionObserver(observerHandler)
		observer.observe(lastElRef.current)

		return () => {
			if (!lastElRef.current) return

			observer.unobserve(lastElRef.current)
		}
	}, [lastElRef.current, isLoading])

	return (
		<AnimatePresence initial={false}>
			<div className={classes.container}>
				<TypographyH3 className={classes.title}>
					Тестовое задание 1
				</TypographyH3>
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
							<MotionRow
								key={todo.id}
								transition={{ duration: 1 }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 100 }}
								exit={{
									opacity: 0,
								}}
							>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>{idx + 1}</TableCell>
								<TableCell>{todo.title}</TableCell>
								<TableCell>
									{todo.completed ? 'Выполнено' : 'Не выполнено'}
								</TableCell>
								<TableCell>
									<Button variant={'ghost'} size={'icon'}>
										<Ellipsis />
									</Button>
								</TableCell>
							</MotionRow>
						))}
					</TableBody>
				</Table>

				{isLoading && 'Загрузка...'}

				<div ref={lastElRef} />
			</div>
		</AnimatePresence>
	)
})
