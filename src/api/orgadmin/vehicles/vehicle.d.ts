import { UUID } from "crypto";

type VehicleForm = {
    vinNo: string;
    model: string;
    licenseNo: string;
    licenseExpiry: Date;
    year: number;
    driverIds: number[] | null;
    manufacturerId: number;
    insuranceIds: UUID[] | null;
    vehicleType: string;
    energyType: string;
    ownershipType: string;
    organizationIds: number[] | null;
    status: string;
    photos: FileList | null;
}

export interface VehicleListItem {
    id: number;
    licenseNo: string;
    model: string;
    vehicleType: string;
    energyType: string;
    status: string;
    drivers: string[];
    organizations: string[];
}