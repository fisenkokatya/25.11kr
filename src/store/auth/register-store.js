import {useMutation, useQueryClient} from '@tanstack/react-query'
import {authService} from '../../service/auth-service.js'
import {productService} from '../../service/product-service.js'
import {favoritesService} from '../../service/favorites-service.js'
import {useNavigate} from 'react-router-dom'
import {useSession} from '../../hooks/use-session.js'

export function useRegister() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const setAuthenticated = useSession(state => state.setAuthenticated)

    const registerMutation = useMutation({
        mutationFn: async (registerData) => {
            const res = await authService.register(registerData)
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
            console.error('Registration failed:', error)
            alert([].concat(error?.response?.data?.message ?? 'Registration failed. Please try again.').join('\n'))
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const registerData = {
            login: formData.get('login') || "",
            email: formData.get('email') || "",
            password: formData.get('password') || "",
        }

        registerMutation.mutate(registerData)

        e.target.reset()
    }

    return {
        handleSubmit,
        isPending: registerMutation.isPending,
    }
}
