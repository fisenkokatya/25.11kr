export const orderFields = [
    {
        name: 'deliveryAddress',
        label: 'Адрес доставки',
        type: 'text',
        placeholder: 'г. Бишкек, ул. Медерова 3, кв. 5',
        required: true,
        validate: (value) => (value.trim().length < 5 ? 'Введите адрес доставки (минимум 5 символов)' : ''),
    },
    {
        name: 'comment',
        label: 'Комментарий к заказу',
        type: 'text',
        placeholder: 'Необязательно',
        required: false,
        validate: () => '',
    },
]

export const emptyOrderValues = Object.fromEntries(orderFields.map((field) => [field.name, '']))
