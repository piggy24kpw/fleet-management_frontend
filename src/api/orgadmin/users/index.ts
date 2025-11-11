import { securedClient } from "@/api/common/instance";
import { UserListItem } from "./user";
import { ModificationResult, PageResult } from "@/template/dto/results";
import { ApiResponse, handleError } from "@/template/dto/common";

export async function getAllUsers(page = 0, size = 10): Promise<PageResult<UserListItem>>  {
  const response = await securedClient().get(`/account/all`);
  return response.data
}

export async function getUserById(requestId: number) {
    const response = await securedClient().get(`/account/${requestId}`)
    return response.data 
}

export async function deleteAccount(requestId: number): ApiResponse<ModificationResult<number>> {
  const response = await securedClient().delete(`/account/${requestId}`).catch(handleError)
  return response?.data
}

export async function updateUser(requestId: number, payload: FormData): ApiResponse<ModificationResult<number>> {
  const response = await securedClient().put(`/account/${requestId}`).catch(handleError)
  return response?.data
}

export async function getAllRoleNames(): Promise<string[]>{
  const response = await securedClient().get(`/admin/role`).catch(handleError)
  return response?.data
}

export async function uploadProfile(id: number, file: File): ApiResponse<ModificationResult<number>> {
  const formData = new FormData()
  formData.append("file", file)
  const response = await securedClient()
    .put(`/account/profile/upload/${id}`, formData)
    .catch(handleError)
  return response?.data
}

export async function updateProfile(id: number, file: File): ApiResponse<ModificationResult<number>> {
  const formData = new FormData()
  formData.append("file", file)
  const response = await securedClient()
    .put(`/account/profile/update/${id}`, formData)
    .catch(handleError)
  return response?.data
}


