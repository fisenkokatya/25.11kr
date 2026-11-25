import {createRoot} from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import {routes} from './router.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 3,
        }
    }
})

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
