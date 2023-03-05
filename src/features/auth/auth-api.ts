import axios from 'axios'

//instance
const commonInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
        'API-KEY': '2606b888-8484-4e56-ac3e-483848e15f9a'
    }
})

//api
export const authAPI = {
    login(data: LoginType) {
        return commonInstance.post<ResponseType<{userId: number}>>('auth/login', data)
    },
    me() {
        return commonInstance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    },
    logout() {
        return commonInstance.delete<ResponseType>('auth/login')
    }
}

// types
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}