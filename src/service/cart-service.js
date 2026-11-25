import {queryOptions} from '@tanstack/react-query'
import {$authApi} from '../api-instance.js'

export const cartService = {
    baseKey: 'cart',

    getCart: async () => {
        const res = await $authApi.get('/cart')
        return res.data?.data
    },

    getCartQueryOptions: () => {
        return queryOptions({
            queryKey: [cartService.baseKey],
            queryFn: cartService.getCart,
        })
    },

    addToCart: async (productId) => {
        const res = await $authApi.post('/cart', {productId, quantity: 1})
        return res.data
    },

    updateQuantity: async ({productId, quantity}) => {
        const res = await $authApi.patch(`/cart/${productId}`, {quantity})
        return res.data
    },

    removeFromCart: async (productId) => {
        const res = await $authApi.delete(`/cart/${productId}`)
        return res.data
    },

    clearCart: async () => {
        const res = await $authApi.delete('/cart')
        return res.data
    },

    normalize: (data) => {
        const rawItems = Array.isArray(data) ? data : (data?.items ?? data?.products ?? [])

        const items = rawItems.map((item) => {
            const product = item?.product ?? item
            return {
                productId: product?._id ?? item?.productId,
                product,
                quantity: Number(item?.quantity ?? product?.quantity ?? 1),
            }
        })

        const computedTotal = items.reduce(
            (sum, item) => sum + (Number(item.product?.price) || 0) * item.quantity,
            0,
        )

        const serverTotal = data?.totalPrice ?? data?.total ?? data?.totalAmount
        const hasServerTotal = serverTotal !== undefined && serverTotal !== null && Number.isFinite(Number(serverTotal))

        return {
            items,
            total: hasServerTotal ? Number(serverTotal) : computedTotal,
            count: items.reduce((sum, item) => sum + item.quantity, 0),
        }
    },
}
