import {useQuery} from '@tanstack/react-query'
import {cartService} from '../../service/cart-service.js'

export function useCart(options = {}) {
    return useQuery({
        ...cartService.getCartQueryOptions(),
        select: cartService.normalize,
        retry: false,
        ...options,
    })
}
