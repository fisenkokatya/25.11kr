import {useMutation, useQueryClient} from '@tanstack/react-query'
import {favoritesService} from '../../service/favorites-service.js'
import {productService} from '../../service/product-service.js'

export function useToggleFavorite() {
    const queryClient = useQueryClient()

    const handleError = (error) => {
        if (error?.response?.status === 401) {
            alert('Пожалуйста, войдите в систему или зарегистрируйтесь')
            return
        }
        console.error('Favorites toggle failed:', error)
        alert('Не удалось обновить избранное. Попробуйте ещё раз.')
    }

    const addMutation = useMutation({
        mutationFn: favoritesService.addToFavorites,
        onError: handleError,
        onSettled() {
            queryClient.invalidateQueries({queryKey: [favoritesService.baseKey]})
            queryClient.invalidateQueries({queryKey: [productService.baseKey]})
        },
    })

    const removeMutation = useMutation({
        mutationFn: favoritesService.removeFromFavorites,
        onError: handleError,
        onSettled() {
            queryClient.invalidateQueries({queryKey: [favoritesService.baseKey]})
            queryClient.invalidateQueries({queryKey: [productService.baseKey]})
        },
    })

    const toggleMutation = (isFavorite, id) => {
        if (isFavorite) {
            removeMutation.mutate(id)
        } else {
            addMutation.mutate(id)
        }
    }

    return {
        mutate: toggleMutation,
        isLoading: addMutation.isPending || removeMutation.isPending,
    }
}
