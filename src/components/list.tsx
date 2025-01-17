// Types
import type { AnimatePresenceProps } from 'motion/react'
import type { PropsWithChildren, ReactNode } from 'react'

// Components
import { AnimatePresence } from 'motion/react'

// Я вроде уже писал, что в идеале нужно все, до чего можем дотянуться описать через JSDoc
// Но делать этого не стал в угоду простоте (в рамках тестового задания)
// Но чтобы показать, что я понимаю о чем говорю, я расписал 1 файл

/** `List` component interface */
export interface IList<T> {
	/** The array that will be iterated over. */
	arr: T[]

	/**
	 * Collback that will be called for each element of the array.
	 *
	 * @param item Array Element.
	 * @param idx Index of the element in the array.
	 * @param arr The original array.
	 */
	callback: (item: T, idx: number, arr: T[]) => ReactNode

	/** Props for animation. Under the hood, it uses AnimatePresence. */
	animate?: PropsWithChildren<AnimatePresenceProps>
}

/**
 * A component for rendering lists.
 *
 * @example <List arr={[1, 2, 3]} callback={num => <span>{num}</span>} />
 *
 * @param props Propses
 */
export function List<T>({ arr, callback, animate }: IList<T>) {
	return (
		<>
			{!!animate ? (
				<AnimatePresence {...animate}>{arr.map(callback)}</AnimatePresence>
			) : (
				<>{arr.map(callback)}</>
			)}
		</>
	)
}
