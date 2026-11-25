import {Link} from 'react-router-dom'
import {useLogin} from '../store/auth/login-store.js'

export function LoginForm() {
    const { handleSubmit, isPending } = useLogin()

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold underline text-teal-500 my-6">LoginForm</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" name="loginOrEmail" placeholder="Username or Email" className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password" name="password" placeholder="Password" className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={isPending}
                >
                    Login
                </button>
                <Link to="/auth?step=register" className="text-blue-500 hover:text-blue-700">
                    Don't have an account? Register
                </Link>
            </form>
        </div>
    )
}
