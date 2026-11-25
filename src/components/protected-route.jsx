import {Navigate, Outlet} from 'react-router-dom'
import {useSession} from '../hooks/use-session.js'

export function ProtectedRoute() {
    const isAuthenticated = useSession(state => state.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to='/auth' replace />
    }

    return <Outlet />
}
