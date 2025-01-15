import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ITodoItem, Todo } from '@/store/todo'
import { FC, ReactNode, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

export interface IDialogTodoEdit {
	children: ReactNode
	todo: ITodoItem
}

export const DialogTodoEdit: FC<IDialogTodoEdit> = ({ children, todo }) => {
	const [title, setTitle] = useState(todo.title)
	const [completed, setCompleted] = useState(todo.completed)
	const [open, setOpen] = useState(false)

	function saveHandler() {
		const foundIdx = Todo.list.findIndex(curr => curr.id === todo.id)

		if (foundIdx === -1) {
			return
		}

		const newTodoList = [...Todo.list]

		newTodoList[foundIdx] = { ...todo, title, completed }

		Todo.setList(newTodoList)

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
					<Button onClick={saveHandler}>Сохранить</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
