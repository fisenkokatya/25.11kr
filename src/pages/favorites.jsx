import {useQuery} from '@tanstack/react-query'
import {Navigate} from 'react-router-dom'
import {favoritesService} from '../service/favorites-service.js'
import {ProductCard} from '../components/product-card.jsx'
import {useSession} from '../hooks/use-session.js'

export function FavoritesPage() {
    const isAuthenticated = useSession(state => state.isAuthenticated)

    const { data, isLoading, isError, isFetching, dataUpdatedAt, refetch } = useQuery({
        ...favoritesService.getFavoritesQueryOptions(),
        retry: false,
    })

    if (!isAuthenticated) {
        return <Navigate to='/auth' replace />
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline text-teal-500 mt-6">FavoritesPage</h1>

            <div className="flex items-center gap-4 mt-4">
                <button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="px-4 py-2 bg-teal-500 text-white rounded cursor-pointer hover:bg-teal-600 active:scale-95 transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isFetching ? 'Обновление...' : 'Refetch'}
                </button>

                {dataUpdatedAt > 0 && (
                    <span className="text-gray-600">
                        Обновлено: {new Date(dataUpdatedAt).toLocaleTimeString('ru-RU')}
                    </span>
                )}
            </div>

            {isLoading && <p className="mt-4">Загрузка...</p>}

            {isError && <p className="mt-4">Пожалуйста, войдите в систему или зарегистрируйтесь</p>}

            {!isLoading && !isError && data?.length === 0 && (
                <p className="mt-4">В избранном пока ничего нет</p>
            )}

            <div className="grid grid-cols-4 gap-4 mt-4">
                {data?.map(product => (
                    <ProductCard key={product._id} product={{...product, isFavorite: true}} />
                ))}
            </div>
        </>
    )
}
