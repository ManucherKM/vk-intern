// Components
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

// Types
import type { ITodoItem, IUpdateTodo } from '@/store/todo'
import type { FC, ReactNode } from 'react'

// Utils
import { useState } from 'react'

// Интерфейс диалогового окна для изменения задачи
export interface IDialogTodoEdit {
	children: ReactNode
	todo: ITodoItem
	onEdit?: (prev: ITodoItem, update: IUpdateTodo) => void
}

// Диалоговое окно для изменения задачи
export const DialogTodoEdit: FC<IDialogTodoEdit> = ({
	children,
	todo,
	onEdit,
}) => {
	// Состояние заголовка
	const [title, setTitle] = useState(todo.title)

	// Состояние выполнения
	const [completed, setCompleted] = useState(todo.completed)

	// Состояние открытости/закрытости диалогового окна
	const [open, setOpen] = useState(false)

	// Функция которая отрабатывает при нажатии на кнопку сохранения
	function saveClickHandler() {
		// Если мы передали функцию для обновления
		if (onEdit) {
			// Вызываем ее передав параметры
			onEdit(todo, { title, completed })
		}

		// Закрываем диалоговое окно
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Изменить задачу</DialogTitle>
					<DialogDescription>
						Внесите изменения и нажмите кнопку сохранить, когда закончите.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="title" className="text-left">
							Заголовок
						</Label>
						<Input
							id="title"
							className="col-span-3"
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="title" className="text-left">
							Выполнено
						</Label>
						<Checkbox
							id="completed"
							checked={completed}
							onCheckedChange={(e: boolean) => setCompleted(e)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={saveClickHandler}>Сохранить</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
