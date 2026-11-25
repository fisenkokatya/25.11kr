export function handleCartError(error) {
    if (error?.response?.status === 401) {
        alert('Пожалуйста, войдите в систему или зарегистрируйтесь')
        return
    }

    console.error('Cart request failed:', error)

    const message = error?.response?.data?.message ?? 'Не удалось выполнить действие с корзиной. Попробуйте ещё раз.'
    alert([].concat(message).join('\n'))
}
