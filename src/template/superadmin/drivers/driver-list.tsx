'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DriverListItem } from "@/api/superadmin/drivers/driver"
import { getAllDrivers } from "@/api/superadmin/drivers"
import DriverCreateButton from "./driver-create"
import DriverDialog from "./driver-dialog"

export default function DriverListTemplate() {
  const [drivers, setDrivers] = useState<DriverListItem[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDrivers() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllDrivers(page, 10)
        console.log("Fetched driver data:", data)

      
        setDrivers(data?.contents ?? [])
        setTotalPages(data?.pager?.totalPage ?? 0)
      } catch (err) {
        console.error("Failed to fetch drivers", err)
        setError("Failed to load drivers. Please try again.")
        setDrivers([])
      } finally {
        setLoading(false)
      }
    }

    fetchDrivers()
  }, [page])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Driver List</h1>
        <div className="flex gap-2">
          <DriverCreateButton />
          <DriverDialog />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>License Type</TableHead>
              <TableHead>License Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Organization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  Loading drivers...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : drivers.length > 0 ? (
              drivers.map((driver, index) => (
                <TableRow key={index}>
                  <TableCell>{driver.username}</TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.licenseType}</TableCell>
                  <TableCell>{driver.licenseExpiry}</TableCell>
                  <TableCell>{driver.status}</TableCell>
                  <TableCell>{driver.organizationName}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No drivers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={page === 0 || loading}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-gray-600">
          Page {page + 1} of {totalPages || 1}
        </span>

        <Button
          variant="outline"
          disabled={page + 1 >= totalPages || loading}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
