import {useToast} from '../store/toast/use-toast.js'

export function Toaster() {
    const message = useToast(state => state.message)
    const type = useToast(state => state.type)
    const hide = useToast(state => state.hide)

    if (!message) return null

    return (
        <div
            onClick={hide}
            className={`fixed top-4 right-4 z-50 max-w-sm px-4 py-3 rounded-lg shadow-lg text-white cursor-pointer ${type === 'error' ? 'bg-red-500' : 'bg-teal-500'}`}
        >
            {message}
        </div>
    )
}
