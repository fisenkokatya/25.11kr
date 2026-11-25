import {create} from 'zustand'

export const useToast = create((set) => ({
    message: null,
    type: 'success',
    show: (message, type = 'success') => {
        set({message, type})
        setTimeout(() => set({message: null}), 3500)
    },
    hide: () => set({message: null}),
}))
