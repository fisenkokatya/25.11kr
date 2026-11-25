import {Link} from 'react-router-dom'
import {useRegister} from '../store/auth/register-store.js'

export function RegisterForm() {
    const { handleSubmit, isPending } = useRegister()

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold underline text-teal-500 my-6">RegisterForm</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" name="login" placeholder="Username" className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" name="email" placeholder="Email" className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password" name="password" placeholder="Password" className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={isPending}
                >
                    Register
                </button>
                <Link to="/auth?step=login" className="text-blue-500 hover:text-blue-700">
                    Already have an account? Login
                </Link>
            </form>
        </div>
    )
}
