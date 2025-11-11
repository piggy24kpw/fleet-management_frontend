import { securedClient } from "@/api/common/instance";
import { ApiResponse, handleError } from "@/template/dto/common";

import { ModificationResult, PageResult } from "@/template/dto/results";
import { VehicleForm, VehicleListItem } from "./vehicle";

export async function getAllVehicles(page = 0, size = 10):Promise<PageResult<VehicleListItem>>{
  const result = await securedClient().get(`/vehicle/all?page=${page}&size=${size}`);
  return result.data;
}

export async function createVehicle(form: FormData):ApiResponse<ModificationResult<number>>{
  const result = await securedClient().post(`/vehicle`, form).catch(handleError);
  return result?.data;
}

// export async function updateVehicle(requestId: unknown, form: Vehicle):ApiResponse<ModificationResult<number>>{
//   const result = await securedClient().put(`/admin/vehicle/${requestId}`, form).catch(handleError);
//   return result?.data;

// }

export async function deleteVehicle(id: number):ApiResponse<ModificationResult<number>>{
  const result = await securedClient().delete(`/admin/vehicle/${id}`).catch(handleError);
  return result?.data;
}

