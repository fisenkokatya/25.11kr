import {useOrders} from '../store/orders/use-orders.js'

const formatDate = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('ru-RU')
}

export function OrdersPage() {
    const { data: orders, isLoading, isError } = useOrders()

    return (
        <>
            <h1 className="text-3xl font-bold underline text-teal-500 mt-6">Мои заказы</h1>

            {isLoading && <p className="mt-4">Загрузка...</p>}

            {isError && <p className="mt-4">Не удалось загрузить заказы</p>}

            {!isLoading && !isError && orders?.length === 0 && (
                <p className="mt-4">У вас пока нет заказов</p>
            )}

            <div className="flex flex-col gap-4 mt-4 mb-8">
                {orders?.map((order) => (
                    <div key={order.id ?? order.number} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h2 className="text-lg font-bold break-all">Заказ № {order.number}</h2>
                            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-bold">{order.status}</span>
                        </div>

                        <p className="text-gray-600 mt-1">Дата: {formatDate(order.createdAt)}</p>

                        {order.deliveryAddress && (
                            <p className="text-gray-600">Адрес: {order.deliveryAddress}</p>
                        )}

                        {order.comment && (
                            <p className="text-gray-600">Комментарий: {order.comment}</p>
                        )}

                        <ul className="mt-3 flex flex-col gap-1">
                            {order.items.map((item, index) => (
                                <li key={`${item.id}-${index}`} className="flex justify-between gap-4">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span className="break-all">${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="text-right text-xl font-bold mt-3 break-all">Итого: ${order.total.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
