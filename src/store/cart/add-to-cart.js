import {useMutation, useQueryClient} from '@tanstack/react-query'
import {cartService} from '../../service/cart-service.js'
import {handleCartError} from './handle-cart-error.js'

export function useAddToCart() {
    const queryClient = useQueryClient()

    const addMutation = useMutation({
        mutationFn: cartService.addToCart,
        onError: handleCartError,
        onSettled() {
            queryClient.invalidateQueries({queryKey: [cartService.baseKey]})
        },
    })

    return {
        addToCart: addMutation.mutate,
        isLoading: addMutation.isPending,
    }
}
