import { ApiResponse, ModificationResult } from "@/template/dto/results"
import { handleError } from "@/template/dto/common"
import { securedClient } from "@/api/common/instance";

export async function getAllVehicleManufacturers():Promise<Vehicle_Manufacturer[]> {
  const response = await securedClient().get(`/manufacturer/all`).catch(handleError);
  return response?.data
}

export async function createVehicleManufacturer(name: string, orgId: number):ApiResponse<ModificationResult<number>> {
    const response = await securedClient().post(`/manufacturer?name=${name}&orgId=${orgId}`).catch(handleError)
    return response?.data
}

export async function updateVehicleManufacturer(requestId:unknown, form:Vehicle_Manufacturer):ApiResponse<ModificationResult<number>> {
    const response = await securedClient().put(`/manufacturer/${requestId}`, form).catch(handleError)
    return response?.data
}

export async function  deleteManufacturerById(requestId:unknown):ApiResponse<ModificationResult<number>> {
  const response = await securedClient().delete(`/manufacturer/${requestId}`).catch(handleError)
  return response?.data

}

