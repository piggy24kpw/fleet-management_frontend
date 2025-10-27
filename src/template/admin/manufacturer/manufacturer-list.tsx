"use client"

import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import VehicleManufacturerCreateButton from "./manufacturer-create"
import VehicleManufacturerDialog from "./manufacturer-dialog"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ManufacturerListTemplateProps = {
  manufacturers?: Array<Vehicle_Manufacturer>
}

export const manufacturercolumns: ColumnDef<Vehicle_Manufacturer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
]

export default function VehicleManufacturerListTemplate({ manufacturers } : ManufacturerListTemplateProps){

    return (
         <div className="container mx-auto py-10">
          <div className="flex justify-end mb-6">
            <VehicleManufacturerCreateButton></VehicleManufacturerCreateButton>
            <VehicleManufacturerDialog></VehicleManufacturerDialog>
          </div>
          <DataTable columns={manufacturercolumns} data={manufacturers ? manufacturers : []} />
        </div>
    )
}
