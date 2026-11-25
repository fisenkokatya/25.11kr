import {queryOptions} from '@tanstack/react-query'
import {$authApi} from '../api-instance.js'

export const favoritesService = {
    baseKey: 'favorites',

    getFavorites: async () => {
        const res = await $authApi.get('/favorites')
        return res.data?.data?.products
    },

    getFavoritesQueryOptions: () => {
        return queryOptions({
            queryKey: [favoritesService.baseKey],
            queryFn: favoritesService.getFavorites,
        })
    },

    addToFavorites: async (productId) => {
        const res = await $authApi.post('/favorites', {productId})
        return res.data
    },

    removeFromFavorites: async (productId) => {
        const res = await $authApi.delete(`/favorites/${productId}`)
        return res.data
    }
}
