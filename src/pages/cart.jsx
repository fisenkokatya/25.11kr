import {Minus, Plus, Trash2} from 'lucide-react'
import {useCart} from '../store/cart/use-cart.js'
import {useCartActions} from '../store/cart/cart-actions.js'
import {OrderForm} from '../components/order-form.jsx'

export function CartPage() {
    const { data: cart, isLoading, isError } = useCart()
    const { changeQuantity, removeItem, clear, isLoading: isBusy } = useCartActions()

    const items = cart?.items ?? []

    return (
        <>
            <h1 className="text-3xl font-bold underline text-teal-500 mt-6">CartPage</h1>

            {isLoading && <p className="mt-4">Загрузка...</p>}

            {isError && <p className="mt-4">Не удалось загрузить корзину</p>}

            {!isLoading && !isError && items.length === 0 && (
                <p className="mt-4">Корзина пуста</p>
            )}

            <div className={`flex flex-col gap-4 mt-4 ${isBusy ? "opacity-60" : ""}`}>
                {items.map(({ productId, product, quantity }) => {
                    const maxReached = Number.isFinite(product?.stock) && quantity >= product.stock
                    const subtotal = (Number(product?.price) || 0) * quantity

                    return (
                        <div key={productId} className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-lg font-bold">{product?.name}</h2>
                                <p className="text-gray-600 break-all">${Number(product?.price || 0).toFixed(2)}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => changeQuantity(productId, quantity - 1)}
                                    disabled={isBusy || quantity <= 1}
                                    className="border border-gray-300 rounded p-1 hover:bg-gray-100 transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Minus />
                                </button>

                                <span className="w-8 text-center font-bold">{quantity}</span>

                                <button
                                    onClick={() => changeQuantity(productId, quantity + 1)}
                                    disabled={isBusy || maxReached}
                                    className="border border-gray-300 rounded p-1 hover:bg-gray-100 transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Plus />
                                </button>
                            </div>

                            <p className="w-40 text-right font-bold break-all">${subtotal.toFixed(2)}</p>

                            <button
                                onClick={() => removeItem(productId)}
                                disabled={isBusy}
                                className="border border-red-500 text-red-500 rounded p-2 hover:bg-red-50 transition duration-300 disabled:opacity-40"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    )
                })}
            </div>

            {items.length > 0 && (
                <div className="flex items-center justify-between gap-4 my-8">
                    <button
                        onClick={() => clear()}
                        disabled={isBusy}
                        className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition duration-300 disabled:opacity-40"
                    >
                        Очистить корзину
                    </button>

                    <p className="text-2xl font-bold break-all">Итого: ${cart.total.toFixed(2)}</p>
                </div>
            )}

            {items.length > 0 && <OrderForm cartItems={items} />}
        </>
    )
}
