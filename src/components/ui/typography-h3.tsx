import { cn } from '@/lib/utils'
import type { FC, HTMLAttributes, ReactNode } from 'react'

export interface ITypographyH3 extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode
}

export const TypographyH3: FC<ITypographyH3> = ({
	children,
	className,
	...props
}) => {
	return (
		<h3
			className={cn([
				'scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight',
				className,
			])}
			{...props}
		>
			{children}
		</h3>
	)
}
