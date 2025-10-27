import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import VehicleDialog from "./vehicle-dialog"
import VehicleCreateButton from "./vehicle-create"


type VehicleListTemplateProps = {
    vehicles? : Array<Vehicle>
}

export const vehiclecolumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vin_no",
    header: "Vin Number",
  },
  {
    accessorKey: "ownership_type",
    header: "Ownership Type",
  },
  {
    accessorKey: "license_type",
    header: "License Type",
  },
  {
    accessorKey: "license_number",
    header: "License Number",
  },
  {
    accessorKey: "license_expiry",
    header: "License Expiry",
  },
  
  {
    accessorKey: "status",
    header: "Status",
  },
  
]

export default function VehicleListTemplate({ vehicles} : VehicleListTemplateProps){

    return (
         <div className="container mx-auto py-10">
          <div className="flex justify-end mb-6">
            <VehicleCreateButton></VehicleCreateButton>
          </div>
            <VehicleDialog></VehicleDialog>
            <DataTable columns={vehiclecolumns} data={vehicles ? vehicles : []} />
        </div>
    )
}