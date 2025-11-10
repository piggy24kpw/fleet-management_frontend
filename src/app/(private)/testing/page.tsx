// 'use client'

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Plus, Search } from "lucide-react"
// import { useState } from "react"

// export default function VehiclesPage() {
//   const [search, setSearch] = useState("")

//   //const vehicles = [] // Replace with fetched data

//   return (
//     <div className="flex flex-col min-h-screen bg-muted/10 p-8">
//       <div className="max-w-7xl w-full mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight">Vehicles</h1>
//             <p className="text-sm text-muted-foreground">
//               Manage your fleet vehicles and license information.
//             </p>
//           </div>
//           <Button className="gap-2">
//             <Plus className="h-4 w-4" />
//             Add Vehicle
//           </Button>
//         </div>

//         {/* Search */}
//         <div className="flex justify-between items-center">
//           <div className="relative w-full max-w-sm">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by VIN, License, etc."
//               className="pl-8"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Data Table */}
//         <Card className="border border-border/50 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base font-medium">Vehicle List</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>ID</TableHead>
//                     <TableHead>VIN Number</TableHead>
//                     <TableHead>Ownership Type</TableHead>
//                     <TableHead>License Type</TableHead>
//                     <TableHead>License Number</TableHead>
//                     <TableHead>License Expiry</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 {/* <TableBody>
//                   {vehicles.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={7}
//                         className="text-center text-muted-foreground py-8"
//                       >
//                         No vehicles found.
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     vehicles.map((v) => (
//                       <TableRow key={v.id}>
//                         <TableCell>{v.id}</TableCell>
//                         <TableCell>{v.vin}</TableCell>
//                         <TableCell>{v.ownershipType}</TableCell>
//                         <TableCell>{v.licenseType}</TableCell>
//                         <TableCell>{v.licenseNumber}</TableCell>
//                         <TableCell>{v.licenseExpiry}</TableCell>
//                         <TableCell>{v.status}</TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody> */}
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/table/data-table"
import { LayoutDashboard, Users, Shield, Car, Route, Wrench, FileText, Edit, Trash2 } from 'lucide-react'

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard')

  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Users', icon: <Users size={18} /> },
    { name: 'Roles', icon: <Shield size={18} /> },
    { name: 'Permissions', icon: <Shield size={18} /> },
    { name: 'Vehicles', icon: <Car size={18} /> },
    { name: 'Routes', icon: <Route size={18} /> },
    { name: 'Maintenance', icon: <Wrench size={18} /> },
    { name: 'Reports', icon: <FileText size={18} /> },
  ]

  const sampleData = [
    { id: 1, name: 'Toyota Hilux', status: 'Active', driver: 'Aung Aung' },
    { id: 2, name: 'Nissan Sunny', status: 'Maintenance', driver: 'Hla Hla' },
  ]

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Driver', accessorKey: 'driver' },
    {
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="text-blue-600 hover:bg-blue-100 border-blue-300">
            <Edit size={16} />
          </Button>
          <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-100 border-red-300">
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen bg-white-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-500 text-white p-6 space-y-5 shadow-xl rounded-tr-3xl rounded-br-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">Fleet Admin</h2>
        {sidebarItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveMenu(item.name)}
            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-600 hover:shadow-lg ${
              activeMenu === item.name ? 'bg-blue-600 shadow-lg border-l-4 border-white' : ''
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-10 bg-blue-600 text-white py-4 px-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold tracking-wide drop-shadow-sm">{activeMenu}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">Notifications</Button>
            <Avatar className="ring-2 ring-white">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Dashboard Cards */}
        {activeMenu === 'Dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Users', 'Vehicles', 'Routes', 'Maintenance', 'Reports'].map((title) => (
              <Card
                key={title}
                className="shadow-xl border-0 bg-blue-600 text-white hover:scale-105 transition-transform duration-300 rounded-2xl"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90">Manage {title.toLowerCase()} information.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* DataTable for each section */}
        {activeMenu !== 'Dashboard' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border-2 border-blue-300 dark:border-blue-700 transition-all duration-300">
            <div className="overflow-hidden rounded-xl border border-blue-200 dark:border-blue-700">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index} className="px-4 py-3 font-semibold">{col.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, i) => (
                    <tr key={i} className={`border-b border-blue-100 hover:bg-blue-50`}> 
                      <td className="px-4 py-2">{row.id}</td>
                      <td className="px-4 py-2">{row.name}</td>
                      <td className="px-4 py-2">{row.status}</td>
                      <td className="px-4 py-2">{row.driver}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <Button variant="outline" size="icon" className="text-blue-600 hover:bg-blue-100 border-blue-300">
                          <Edit size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-100 border-red-300">
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
