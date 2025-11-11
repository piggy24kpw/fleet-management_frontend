import { authStore } from "@/template/store/auth-result.store";
import axios from "axios";
import { refreshToken } from "../auth/client";

export function anonymousClient() {
    return axios.create({
    //    baseURL: 'http://10.253.73.214:8080/token',
        baseURL: 'http://localhost:8080/token',
        timeout: 3000
    })
}

export function securedClient() {

    const instance = axios.create({
        // baseURL: 'http://10.253.73.214:8080',
       baseURL: 'http://localhost:8080',
        timeout: 5000
    })

    instance.interceptors.request.use(config => {
        const {auth} = authStore.getState()
    
        if(auth?.accessToken) {
            config?.headers.set('Authorization', `Bearer ${auth.accessToken}`)
        }
        return config
    })

    instance.interceptors.response.use(response => {
        return response
    }, async (error) => {

        const originalRequest = error.config
        const {auth, setAuth} = authStore.getState()

        if(error.response?.status == 401 && auth?.refreshToken && !originalRequest._retry) {
            originalRequest._retry = true
            
            try {
                const response = await refreshToken(auth.refreshToken)

                setAuth(response)

                originalRequest.headers['Authorization'] = `Bearer ${response?.accessToken}`
                return instance(originalRequest)
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError)

                setAuth(undefined)
            }
        }

        return Promise.reject(error)
    })

    return instance
}
