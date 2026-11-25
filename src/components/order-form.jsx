import {useState} from 'react'
import {useCreateOrder} from '../store/orders/create-order.js'
import {emptyOrderValues, orderFields} from '../store/orders/order-form-config.js'

export function OrderForm({cartItems}) {
    const [values, setValues] = useState(emptyOrderValues)
    const [touched, setTouched] = useState({})
    const {createOrder, isPending} = useCreateOrder()

    const errors = {}
    orderFields.forEach((field) => {
        const value = values[field.name]
        if (field.required && !value.trim()) {
            errors[field.name] = 'Это поле обязательно'
        } else {
            const message = field.validate(value)
            if (message) errors[field.name] = message
        }
    })

    const isValid = Object.keys(errors).length === 0

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleBlur = (e) => {
        setTouched({...touched, [e.target.name]: true})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setTouched(Object.fromEntries(orderFields.map((field) => [field.name, true])))
        if (!isValid || isPending) return

        const formValues = Object.fromEntries(
            Object.entries(values)
                .map(([key, value]) => [key, value.trim()])
                .filter(([, value]) => value !== ''),
        )

        createOrder({formValues, cartItems})
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-teal-500">Оформление заказа</h2>

            {orderFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                    <label htmlFor={field.name} className="font-bold">
                        {field.label}{field.required && <span className="text-red-500"> *</span>}
                    </label>
                    <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={values[field.name]}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border rounded px-3 py-2 ${touched[field.name] && errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {touched[field.name] && errors[field.name] && (
                        <p className="text-red-500 text-sm">{errors[field.name]}</p>
                    )}
                </div>
            ))}

            <button
                type="submit"
                disabled={!isValid || isPending}
                className="bg-teal-500 text-white font-bold px-4 py-3 rounded hover:bg-teal-600 transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {isPending ? 'Отправка...' : 'Оформить заказ'}
            </button>
        </form>
    )
}
