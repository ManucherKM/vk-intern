// Components
import { StrictMode } from 'react'
import { App } from './components/app/app'

// Styles
// Не стал абсолютно полностью держать весь проект на модульном CSS, просто потому, что UI kit под капотом использует TailwindCSS
// и имеет другие зависимости которые разрабатывались не на модульном CSS, но там, где нужно было дописывать стили, писал на модульном CSS.
// Надеюсь на ваше понимание.
import './styles/index.scss'

// Utils
import { createRoot } from 'react-dom/client'

// Получаем узел в который будем монтировать приложение
const root = document.getElementById('root')!

// Получаем переменную окружения отвечающую за режим разработки и сразу преобразовываем ее в boolean значение
const IS_DEV = import.meta.env.VITE_IS_DEV === 'true'

// Рендерим приложение в полученый узел
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
