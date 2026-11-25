import {NavLink} from 'react-router-dom'
import {useSession} from '../hooks/use-session.js'
import {useLogout} from '../store/auth/logout-store.js'
import {useCart} from '../store/cart/use-cart.js'

export function AppHeader() {
    const isAuthenticated = useSession(state => state.isAuthenticated)
    const { logout, isPending } = useLogout()
    const { data: cart } = useCart({ enabled: isAuthenticated })

    return (
        <header className="p-4 bg-teal-500">
            <ul className="flex gap-4 text-white font-bold max-w-7xl mx-auto">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/favorites">Favorites</NavLink>
                </li>
                <li>
                    <NavLink to="/cart">Cart{isAuthenticated && cart?.count ? ` (${cart.count})` : ''}</NavLink>
                </li>
                <li>
                    <NavLink to="/orders">Orders</NavLink>
                </li>
                {isAuthenticated ? (
                    <li>
                        <button onClick={() => logout()} disabled={isPending} className="font-bold disabled:opacity-50">
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <NavLink to="/auth">Auth</NavLink>
                    </li>
                )}
            </ul>
        </header>
    )
}
