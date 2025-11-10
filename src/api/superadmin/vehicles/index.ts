import { securedClient } from "@/api/common/instance";
import { ApiResponse, handleError } from "@/template/dto/common";

import { ModificationResult } from "@/template/dto/results";

export async function getAllVehicle():Promise<Vehicle[]>{
  const result = await securedClient().get(`/admin/vehicle/all`);
  return result.data;
}

export async function createVehicle(form: Vehicle):ApiResponse<ModificationResult<number>>{
  const result = await securedClient().post(`/admin/vehicle`, form).catch(handleError);
  return result?.data;
}

export async function updateVehicle(requestId: unknown, form: Vehicle):ApiResponse<ModificationResult<number>>{
  const result = await securedClient().put(`/admin/vehicle/${requestId}`, form).catch(handleError);
  return result?.data;

}

export async function deleteVehicle(id: number):ApiResponse<ModificationResult<number>>{
  const result = await securedClient().delete(`/admin/vehicle/${id}`).catch(handleError);
  return result?.data;
}

