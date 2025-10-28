import { ApiResponse, AuthResult, handleError, SignInForm } from "@/template/dto/common"
import { anonymousClient, securedClient } from "../common/instance"
import { ModificationResult } from "@/template/dto/results"

export async function signInRequest(form : SignInForm):ApiResponse<AuthResult> {
    const response = await anonymousClient().post('/generate', form).catch(handleError)
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

export async function createManufacturer(name: string):ApiResponse<ModificationResult<number>> {
    const response = await securedClient().post('/admin/manufacturer', {name : name}).catch(handleError)
    return response?.data
}