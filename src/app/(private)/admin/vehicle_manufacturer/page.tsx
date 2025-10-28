import vehicle_manufacturer from '@/api/vehicle_manufacturer'
import VehicleManufacturerListTemplate from "@/template/admin/manufacturer/manufacturer-list"

export default async function VehicleManufacturerPage() {
    // const manufacturers = await vehicle_manufacturer.all()
    
    return (
        <VehicleManufacturerListTemplate/>
    )
}