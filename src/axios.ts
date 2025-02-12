// Utils
import axios from 'axios'

// Получаем из переменных окружения URL API. В нашем случае это API JSONPlaceholder.
const API_URL = import.meta.env.VITE_API_URL

// Создаем свой instance, который позволяет нам получить ряд удобств.
// Например в нашем случае это (baseURL) то, что нам не прийдется постоянно дублировать API_URL для каждого запроса.
const instance = axios.create({
	baseURL: API_URL,
})

// С помощью такого подхода мы можем экспортировать несколько инстансов для каждого апи.
// Например, если фронт проекта это "монолит", а апи разбит на сервисы, мы можем просто создать несколько инстансов для каждого сервиса и кидать
// запросы через них (инстансы), что довольно удобно, и в некоторой степени оптимизирует нашу работу.
export const api = instance
