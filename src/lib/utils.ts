import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Утилита сгенерировалась с компонентами UI kit`а
// Суть проста, просто склеивать классы (поддерживает условия)
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
