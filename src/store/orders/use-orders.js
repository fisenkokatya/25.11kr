import {useQuery} from '@tanstack/react-query'
import {orderService} from '../../service/order-service.js'

export function useOrders() {
    return useQuery({
        ...orderService.getOrdersQueryOptions(),
        select: orderService.normalize,
        retry: false,
    })
}
