type Vehicle = {
    id?: number,
    vinNo: string;
    model: string;
    licenseNo: string;
    licenseExpiry: string;
    year: number;
    driverIds: number[];
    manufacturerId: number;
    insuranceIds: string[];
    vehicle_type: string;
    type: string;
    ownership_type: string;
    status: active | inactive | maintenance

}