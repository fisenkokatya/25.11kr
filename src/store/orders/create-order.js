import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {orderService} from '../../service/order-service.js'
import {cartService} from '../../service/cart-service.js'
import {useToast} from '../toast/use-toast.js'

export function useCreateOrder() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const showToast = useToast(state => state.show)

    const mutation = useMutation({
        mutationFn: async ({formValues, cartItems}) => {
            const payload = orderService.buildPayload(formValues, cartItems)
            const result = await orderService.createOrder(payload)

            try {
                await cartService.clearCart()
            } catch {
                return result
            }

            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [cartService.baseKey]})
            queryClient.invalidateQueries({queryKey: [orderService.baseKey]})
            showToast('Заказ успешно оформлен!')
            navigate('/orders')
        },
        onError: (error) => {
            console.error('Order failed:', error)
            const message = error?.response?.data?.message ?? 'Не удалось оформить заказ. Попробуйте ещё раз.'
            showToast([].concat(message).join('\n'), 'error')
        },
    })

    return {
        createOrder: mutation.mutate,
        isPending: mutation.isPending,
    }
}
