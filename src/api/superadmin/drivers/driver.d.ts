import { uuid } from "zod"

type Driver = {
    usernameOrEmail: string,
    licenseNumber: string,
    licenseType: string,
    licenseExpiry : string,
    status: ACTIVE | AVAILABLE
}

export type LicenseType = 
  'L'
  'A'
  'B'
  'C'
  'D';


export type DriverStatus = 
  | "ACTIVE"
  | "AVAILABLE";


export interface DriverListItem {
  username: string;
  email: string;
  licenseNumber: string;
  licenseType: LicenseType;
  licenseExpiry: string; 
  status: DriverStatus;
  organizationName: string;
}

export interface DriverIdAndName {
  id: number;
  username: string;
}

export interface OrganizationIdAndName {
  id: number;
  name: string;
}

export interface ManufacturerIdAndName {
  id: number;
  name: string;
}