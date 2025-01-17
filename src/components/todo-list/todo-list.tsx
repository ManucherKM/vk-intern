// Types
import type { ITodoItem } from '@/store/todo'
import type { FC, ReactNode } from 'react'
import type { IDialogTodoEdit } from '../dialog-todo-edit'

// Components
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Pen, Trash2 } from 'lucide-react'
import { List } from '../list'
import { TypographyH3 } from '../ui/typography-h3'

// Styles
import classes from './styles/todo-list.module.scss'

// Utils
import { motion } from 'motion/react'
import { DialogTodoEdit } from '../dialog-todo-edit'

// Компонент TableRow обернутый библиотекой framer-motion, для анимаций (в нашем случае это анимации на удаление/добавление список)
const MotionRow = motion.create(TableRow)

// Интерфейс компонента TodoList
export interface ITodoList {
	title: string
	caption: string
	cells: ITodoItem[]
	navigation?: ReactNode
	onEdit?: IDialogTodoEdit['onEdit']
	onDelete?: (id: number) => void
	condition?: (todo: ITodoItem) => boolean
}

// Компонент TodoList. Вынес в отдельный компонент, чтобы была возможность отображать списки задач, не зависимо друг от друга
export const TodoList: FC<ITodoList> = ({
	title,
	caption,
	cells,
	navigation,
	onEdit,
	onDelete,
	condition,
}) => {
	return (
		<>
			<TypographyH3 className={classes.title}>{title}</TypographyH3>
			{navigation}
			<Table>
				<TableCaption>{caption}</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>№</TableHead>
						<TableHead className="w-3/5">Содержание</TableHead>
						<TableHead>Статус</TableHead>
						<TableHead className="text-right">Действие</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<List
						animate={{ initial: false }}
						arr={cells}
						callback={cell => {
							if (typeof condition !== 'function' || condition(cell)) {
								return (
									<MotionRow
										key={cell.id}
										transition={{ duration: 0.3 }}
										initial={{ opacity: 0 }}
										animate={{ opacity: 100 }}
										exit={{
											opacity: 0,
										}}
									>
										<TableCell>{cell.id}</TableCell>
										<TableCell>{cell.title}</TableCell>
										<TableCell>
											{cell.completed ? 'Выполнено' : 'Не выполнено'}
										</TableCell>
										<TableCell className="text-right">
											{typeof onEdit === 'function' && (
												<DialogTodoEdit todo={cell} onEdit={onEdit}>
													<Button variant={'ghost'} size={'icon'}>
														<Pen />
													</Button>
												</DialogTodoEdit>
											)}

											{typeof onDelete === 'function' && (
												<Button
													variant={'ghost'}
													size={'icon'}
													onClick={() => onDelete(cell.id)}
												>
													<Trash2 />
												</Button>
											)}
										</TableCell>
									</MotionRow>
								)
							}
						}}
					/>
				</TableBody>
			</Table>
		</>
	)
}
