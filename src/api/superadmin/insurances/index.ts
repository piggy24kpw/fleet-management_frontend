import { securedClient } from "@/api/common/instance"
import { InsuranceIdAndName } from "./insurance"

export async function getAllInsurancesIdAndNames(orgId : number): Promise<InsuranceIdAndName[]> {
  const response = await securedClient().get(`/insurance/org/${orgId}`)
  return response.data
}