import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider, createBrowserHistory } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query' // <-- Добавили импорт QueryClient
import { routeTree } from './routeTree.gen'
import './styles.css'

// 1. Инициализируем клиент запросов, который требует контекст __root.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

// 2. Фиксируем базовую историю путей для браузера
const browserHistory = createBrowserHistory({
  base: '/',
})

// 3. Создаем роутер и ОБЯЗАТЕЛЬНО передаем queryClient в контекст
const router = createRouter({ 
  routeTree,
  history: browserHistory,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
