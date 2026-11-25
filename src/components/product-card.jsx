import {Heart, ShoppingCart} from 'lucide-react'
import {useToggleFavorite} from '../store/favorites/toggle-favorite.js'
import {useAddToCart} from '../store/cart/add-to-cart.js'

export function ProductCard({ product }) {
    const { mutate, isLoading } = useToggleFavorite()
    const { addToCart, isLoading: isAdding } = useAddToCart()

    const isFavorite = Boolean(product?.isFavorite)

    return (
        <div className="w-64 bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4">
                <img src={product?.image} alt={product?.name} className="w-full h-full object-cover mb-4" />
            </div>
            <h2 className="text-lg font-bold mb-2">{product?.name}</h2>
            <p className="text-gray-600 mb-4">{product?.description}</p>
            <p className="text-xl font-bold mb-4 break-all">${product?.price?.toFixed(2)}</p>

            <div className="flex gap-2">
                <button
                    onClick={() => addToCart(product._id)}
                    disabled={isAdding}
                    className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300 disabled:opacity-50"
                >
                    <ShoppingCart />
                    В корзину
                </button>

                <button
                    onClick={() => mutate(isFavorite, product._id)}
                    disabled={isLoading}
                    className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition duration-300 disabled:opacity-50"
                >
                    <Heart fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
            </div>
        </div>
    )
}
