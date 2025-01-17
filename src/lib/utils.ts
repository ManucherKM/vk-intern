import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Суть утилиты проста, просто склеивать классы (поддерживает условия)
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
