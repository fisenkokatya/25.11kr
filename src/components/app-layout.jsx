import {Outlet} from 'react-router-dom'
import {AppHeader} from './app-header.jsx'
import {Toaster} from './toaster.jsx'

export function AppLayout() {
    return (
        <>
            <AppHeader />
            <main className="max-w-7xl mx-auto px-4">
                <Outlet />
            </main>
            <Toaster />
        </>
    )
}
