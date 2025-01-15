import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/app/app'
import './styles/index.scss'

const root = document.getElementById('root')!

// Преобразовываем в boolean значение
const IS_DEV = import.meta.env.VITE_IS_DEV === 'true'

createRoot(root).render(
	<>
		{IS_DEV ? (
			<StrictMode>
				<App />
			</StrictMode>
		) : (
			<App />
		)}
	</>,
)
