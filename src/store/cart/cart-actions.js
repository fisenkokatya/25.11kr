import {useMutation, useQueryClient} from '@tanstack/react-query'
import {cartService} from '../../service/cart-service.js'
import {handleCartError} from './handle-cart-error.js'

export function useCartActions() {
    const queryClient = useQueryClient()

    const options = {
        onError: handleCartError,
        onSettled() {
            queryClient.invalidateQueries({queryKey: [cartService.baseKey]})
        },
    }

    const updateMutation = useMutation({
        mutationFn: cartService.updateQuantity,
        ...options,
    })

    const removeMutation = useMutation({
        mutationFn: cartService.removeFromCart,
        ...options,
    })

    const clearMutation = useMutation({
        mutationFn: cartService.clearCart,
        ...options,
    })

    return {
        changeQuantity: (productId, quantity) => updateMutation.mutate({productId, quantity}),
        removeItem: (productId) => removeMutation.mutate(productId),
        clear: () => clearMutation.mutate(),
        isLoading: updateMutation.isPending || removeMutation.isPending || clearMutation.isPending,
    }
}
