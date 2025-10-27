import { ApiResponse, AuthResult, SignInForm } from "@/template/dto/common"
import { anonymousClient } from "../common/instance"

export async function signInRequest(form : SignInForm):ApiResponse<AuthResult> {
    const response = await anonymousClient().post('/token/generate', form).catch(handleError)
    return response?.data
}

// export async function signUpRequest(form: SignUpForm):ApiResponse<AuthResult> {
//     const response = await anonymousClient().post('/signup', form).catch(handleError)
//     return response?.data
// }

export async function refreshToken(token: string):ApiResponse<AuthResult> {
    const response = await anonymousClient().post('/token/refresh', {token : token}).catch(handleError)
    return response?.data
}