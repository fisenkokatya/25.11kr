import {useMutation, useQueryClient} from '@tanstack/react-query'
import {authService} from '../../service/auth-service.js'
import {useNavigate} from 'react-router-dom'
import {useSession} from '../../hooks/use-session.js'

export function useLogout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const clearSession = useSession(state => state.reset)

    const logoutMutation = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            localStorage.removeItem('accessToken')
            queryClient.clear()
            clearSession()
            navigate('/auth')
        }
    })

    return {
        logout: logoutMutation.mutate,
        isPending: logoutMutation.isPending,
    }
}
