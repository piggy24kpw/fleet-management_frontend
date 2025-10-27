import { authStore } from "@/template/store/auth-result.store";
import axios from "axios";

export function anonymousClient() {
    return axios.create({
        baseURL: 'http://localhost:8080/token',
        timeout: 3000
    })
}

export function securedClient() {

    const instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 3000
    })

    instance.interceptors.request.use(config => {
        const {auth} = authStore.getState()
    
        if(auth) {
            config?.headers.set('Authorization', `Bearer ${auth.accessToken}`)
        }
        return config
    })

    instance.interceptors.response.use(response => {
        return response
    }, async (error) => {

        const originalRequest = error.config
        const {auth, setAuth} = authStore.getState()

        if(error.status == 408 && !originalRequest._retry) {
            originalRequest._retry = true
            
            // Refresh token
            const refreshResult = await refreshToken(auth?.refreshToken || '')
            setAuth(refreshResult)

            // Retry last request
            instance(originalRequest)

            return
        }

        return Promise.reject(error)
    })

    return instance
}

function refreshToken(arg0: string) {
    throw new Error("Function not implemented.");
}
