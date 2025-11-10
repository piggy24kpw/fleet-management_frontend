'use client'

import { useEffect, useState } from "react"
import { getAllVehicleManufacturers } from "@/api/superadmin/vehicle_manufacturer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import VehicleManufacturerCreateButton from "./manufacturer-create"
import VehicleManufacturerDialog from "./manufacturer-dialog"

export default function VehicleManufacturerListTemplate() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [manufacturers, setManufacturers] = useState<Vehicle_Manufacturer[]>([])

  useEffect(() => {
    async function fetchManufacturers() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllVehicleManufacturers()
        setManufacturers(data || [])
      } catch (err) {
        console.error("Failed to fetch manufacturers", err)
        setError("Failed to load manufacturers. Please try again.")
        setManufacturers([])
      } finally {
        setLoading(false)
      }
    }
    fetchManufacturers()
  }, [])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Manufacturer List</h1>
        <div className="flex gap-2">
          <VehicleManufacturerCreateButton />
          <VehicleManufacturerDialog />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                  Loading manufacturers...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : manufacturers.length > 0 ? (
              manufacturers.map((manufacturer, index) => (
                <TableRow key={index}>
                  <TableCell>{manufacturer.id}</TableCell>
                  <TableCell>{manufacturer.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost"><Pencil className="size-4" /></Button>
                    <Button variant="ghost"><Trash2 className="size-4" /></Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                  No Manufacturer found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
