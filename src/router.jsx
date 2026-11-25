import {createBrowserRouter} from 'react-router-dom'
import {AppLayout} from './components/app-layout.jsx'
import {HomePage} from './pages/home.jsx'
import {FavoritesPage} from './pages/favorites.jsx'
import {CartPage} from './pages/cart.jsx'
import {OrdersPage} from './pages/orders.jsx'
import {AuthPage} from './pages/auth.jsx'
import {ProtectedRoute} from './components/protected-route.jsx'

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: AppLayout,
        children: [
            { index: true, Component: HomePage },
            { path: 'auth', Component: AuthPage },
            {
                Component: ProtectedRoute,
                children: [
                    { path: 'favorites', Component: FavoritesPage },
                    { path: 'cart', Component: CartPage },
                    { path: 'orders', Component: OrdersPage },
                ]
            },
            { path: '*', element: <h1>404</h1> }
        ]
    }
])
