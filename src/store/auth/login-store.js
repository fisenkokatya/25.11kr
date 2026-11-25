import {useMutation, useQueryClient} from '@tanstack/react-query'
import {authService} from '../../service/auth-service.js'
import {productService} from '../../service/product-service.js'
import {favoritesService} from '../../service/favorites-service.js'
import {useNavigate} from 'react-router-dom'
import {useSession} from '../../hooks/use-session.js'

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const setAuthenticated = useSession(state => state.setAuthenticated)

    const loginMutation = useMutation({
        mutationFn: async (loginData) => {
            const res = await authService.login(loginData)
            return res
        },
        onSuccess: (data) => {
            const accessToken = data?.accessToken ?? data?.data?.accessToken
            localStorage.setItem('accessToken', accessToken)
            setAuthenticated(true)
            queryClient.invalidateQueries({queryKey: [productService.baseKey]})
            queryClient.invalidateQueries({queryKey: [favoritesService.baseKey]})
            navigate('/')
        },
        onError: (error) => {
            console.error('Login failed:', error)
            alert([].concat(error?.response?.data?.message ?? 'Login failed. Please try again.').join('\n'))
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const loginData = {
            loginOrEmail: formData.get('loginOrEmail') || "",
            password: formData.get('password') || "",
        }

        loginMutation.mutate(loginData)

        e.target.reset()
    }

    return {
        handleSubmit,
        isPending: loginMutation.isPending,
    }
}
