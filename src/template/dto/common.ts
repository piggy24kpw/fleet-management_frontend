import { AxiosError } from "axios"
import { clientErrorStore } from "../store/auth-result.store"

export interface SignInForm {
    username: string
    password: string
}

export interface AuthResult {
  username: string
  role: string
  accessToken: string
  refreshToken: string
}

export type Optional<T> = T | undefined

export type ApiResponse<T> = Promise<Optional<T>>

export function handleError(error: AxiosError) {
    clientErrorStore.getState().setError(error)
}

