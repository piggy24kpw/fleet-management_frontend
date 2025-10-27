import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import DriverCreateButton from "./driver-create"
import DriverDialog from "./driver-dialog"


type DriverListTemplateProps = {
    drivers? : Array<Driver>
}

export const drivercolumns: ColumnDef<Driver>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user_id",
    header: "User ID",
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
    accessorKey: "license_type",
    header: "License Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  }
]

export default function DriverListTemplate({ drivers} : DriverListTemplateProps){

    return (
         <div className="container mx-auto py-10">
          <div className="flex justify-end mb-6">
            <DriverCreateButton></DriverCreateButton>
          </div>
          <DriverDialog></DriverDialog>
          <DataTable columns={drivercolumns} data={drivers ? drivers : []} />
        </div>
    )
}