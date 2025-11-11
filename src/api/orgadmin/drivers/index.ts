import { ApiResponse, ModificationResult, PageResult } from "@/template/dto/results"
import { securedClient } from "../../common/instance"
import { handleError } from "@/template/dto/common"
import { Driver, DriverDetails, DriverIdAndName, DriverListItem, ManufacturerIdAndName } from "./driver"

export async function getAllDrivers(page = 0, size = 10): Promise<PageResult<DriverListItem>> {
  const response = await securedClient().get(`/driver/all?page=${page}&size=${size}`)
  return response.data
}

export async function getDriverDetails(requestId: number): Promise<DriverDetails> {
    const response = await securedClient().get(`/driver/${requestId}`)
    return response.data 
}

export async function createDriver(form: Driver | null | undefined):ApiResponse<ModificationResult<number>> {
    const response = await securedClient().post(`/driver`, form, {
      headers: { 'Content-Type': 'application/json' }
    }).catch(handleError)
    return response?.data
}

export async function updateDriver(requestId:unknown, form:Driver):ApiResponse<ModificationResult<number>> {
    const response = await securedClient().put(`/driver/${requestId}`, form).catch(handleError)
    return response?.data
}

export async function getAllDriversIdAndNames(orgId : number): Promise<DriverIdAndName[]> {
  const response = await securedClient().get(`/driver/org/${orgId}`)
  return response.data
}

export async function getAllManufacturers(orgId : number): Promise<ManufacturerIdAndName[]> {
  const response = await securedClient().get(`/manufacturer/org/${orgId}`)
  return response.data
}
