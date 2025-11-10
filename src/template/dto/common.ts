import { AxiosError } from "axios"
import { clientErrorStore } from "../store/auth-result.store"

export interface SignInForm {
    userId: number
    username: string
    email: string
    organization: string
    secretKey: string
}

export interface AuthResult {
  userId: number
  username: string
  email: string
  role: string
  organizationId: number
  accessToken: string
  refreshToken: string
}

export type Optional<T> = T | undefined

export type ApiResponse<T> = Promise<Optional<T>>

export function handleError(error: AxiosError) {
    clientErrorStore.getState().setError(error)
}

