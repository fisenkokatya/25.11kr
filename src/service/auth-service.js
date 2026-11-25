import {$mainApi} from '../api-instance.js'

export const authService = {
    login: async (loginData) => {
        const res = await $mainApi.post('/auth/sign-in', loginData)
        return res.data
    },

    register: async (registerData) => {
        const res = await $mainApi.post('/auth/sign-up', registerData)
        return res.data
    },

    logout: async () => {
        await $mainApi.post('/auth/logout')
    },

    refresh: async () => {
        const res = await $mainApi.post('/auth/refresh')
        return res.data
    }
}
