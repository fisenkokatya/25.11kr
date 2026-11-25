import {queryOptions} from '@tanstack/react-query'
import {$authApi} from '../api-instance.js'

export const orderService = {
    baseKey: 'orders',

    createOrder: async (payload) => {
        const res = await $authApi.post('/orders', payload)
        return res.data
    },

    getOrders: async () => {
        const res = await $authApi.get('/orders')
        return res.data?.data ?? res.data
    },

    getOrdersQueryOptions: () => {
        return queryOptions({
            queryKey: [orderService.baseKey],
            queryFn: orderService.getOrders,
        })
    },

    buildPayload: (formValues, cartItems) => {
        return {
            ...formValues,
            items: cartItems.map(({productId, product, quantity}) => ({
                productId,
                quantity,
                price: Number(product?.price) || 0,
            })),
        }
    },

    normalize: (data) => {
        const rawOrders = Array.isArray(data) ? data : (data?.orders ?? data?.items ?? [])

        return rawOrders.map((order) => {
            const rawItems = order?.items ?? order?.products ?? []

            const items = rawItems.map((item) => {
                const product = item?.product ?? item
                return {
                    id: product?._id ?? item?.productId ?? item?._id,
                    name: product?.name ?? item?.name ?? 'Товар',
                    price: Number(item?.price ?? product?.price) || 0,
                    quantity: Number(item?.quantity ?? 1),
                }
            })

            const computedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            const serverTotal = order?.totalPrice ?? order?.total ?? order?.totalAmount

            return {
                id: order?._id ?? order?.id,
                number: order?.orderNumber ?? order?.number ?? order?._id ?? order?.id,
                createdAt: order?.createdAt ?? order?.date,
                status: order?.status ?? '—',
                deliveryAddress: order?.deliveryAddress,
                comment: order?.comment,
                items,
                total: Number.isFinite(Number(serverTotal)) && serverTotal !== null && serverTotal !== undefined
                    ? Number(serverTotal)
                    : computedTotal,
            }
        })
    },
}
