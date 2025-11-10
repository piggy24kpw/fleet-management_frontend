import { ApiResponse, ModificationResult, PageResult } from "@/template/dto/results"
import { securedClient } from "../../common/instance"
import { handleError } from "@/template/dto/common"
import { Driver, DriverListItem } from "./driver"

export async function getAllDrivers(page = 0, size = 10): Promise<PageResult<DriverListItem>> {
  const response = await securedClient().get(`/admin/driver/all?page=${page}&size=${size}`)
  return response.data
}

export async function createDriver(form: Driver | null | undefined):ApiResponse<ModificationResult<number>> {
    const response = await securedClient().post(`/admin/driver`, form, {
      headers: { 'Content-Type': 'application/json' }
    }).catch(handleError)
    return response?.data
}

export async function updateDriver(requestId:unknown, form:Driver):ApiResponse<ModificationResult<number>> {
    const response = await securedClient().put(`/admin/driver/${requestId}`, form).catch(handleError)
    return response?.data
}


