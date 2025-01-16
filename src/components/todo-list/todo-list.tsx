// Types
import type { ITodoItem } from '@/store/todo'
import type { FC, ReactNode } from 'react'

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

const MotionRow = motion.create(TableRow)

export interface ITodoList {
	title: string
	caption: string
	heads: string[]
	cells: ITodoItem[]
	navigation?: ReactNode
	isEdit?: boolean
	onDelete?: (id: number) => void
	condition?: (todo: ITodoItem) => boolean
}

export const TodoList: FC<ITodoList> = ({
	title,
	caption,
	heads,
	cells,
	navigation,
	isEdit,
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
						<List
							arr={heads}
							callback={head => <TableHead key={head}>{head}</TableHead>}
						/>
					</TableRow>
				</TableHeader>
				<TableBody>
					<List
						arr={cells}
						callback={(cell, idx) => {
							if (typeof condition !== 'function' || condition(cell)) {
								return (
									<MotionRow
										key={cell.id}
										transition={{ duration: 1 }}
										initial={{ opacity: 0 }}
										animate={{ opacity: 100 }}
										exit={{
											opacity: 0,
										}}
									>
										<TableCell>{idx + 1}</TableCell>
										<TableCell>{cell.title}</TableCell>
										<TableCell>
											{cell.completed ? 'Выполнено' : 'Не выполнено'}
										</TableCell>
										<TableCell>
											{isEdit && (
												<DialogTodoEdit todo={cell}>
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
