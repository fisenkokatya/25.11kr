import {create} from 'zustand'

export const useSession = create((set) => ({
    isAuthenticated: Boolean(localStorage.getItem('accessToken')),
    user: null,
    setUser: (user) => set({user}),
    setAuthenticated: (isAuthenticated) => set({isAuthenticated}),
    reset: () => set({user: null, isAuthenticated: false}),
}))
