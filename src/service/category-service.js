import {queryOptions} from '@tanstack/react-query'
import {$mainApi} from '../api-instance.js'

export const categoryService = {
    baseKey: 'categories',

    getAll: async () => {
        const res = await $mainApi.get('/categories')
        return res.data?.data
    },

    getCategoriesQueryOptions: () => {
        return queryOptions({
            queryKey: [categoryService.baseKey],
            queryFn: categoryService.getAll,
        })
    },
}
