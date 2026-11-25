import {useAppSearchParams} from '../hooks/use-app-search-params.js'
import {LoginForm} from '../components/login-form.jsx'
import {RegisterForm} from '../components/register-form.jsx'

export function AuthPage() {
    const { get } = useAppSearchParams()

    const mode = get('step') || 'login'

    const forms = {
        login: <LoginForm />,
        register: <RegisterForm />,
    }

    return forms[mode] ?? forms.login
}
