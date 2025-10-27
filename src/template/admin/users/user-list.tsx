import { DataTable } from "@/components/table/data-table"
import { ColumnDef } from "@tanstack/react-table"


type UserListTemplateProps = {
    users? : Array<User>
}

export const usercolumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  }
]

export default function UserListTemplate({ users } : UserListTemplateProps){

    return (
         <div className="container mx-auto py-10">
            <DataTable columns={usercolumns} data={users ? users : []} />
        </div>
    )
}