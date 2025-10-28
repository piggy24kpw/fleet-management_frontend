'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search } from "lucide-react"
import { useState } from "react"

export default function VehiclesPage() {
  const [search, setSearch] = useState("")

  //const vehicles = [] // Replace with fetched data

  return (
    <div className="flex flex-col min-h-screen bg-muted/10 p-8">
      <div className="max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Vehicles</h1>
            <p className="text-sm text-muted-foreground">
              Manage your fleet vehicles and license information.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>

        {/* Search */}
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by VIN, License, etc."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Data Table */}
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium">Vehicle List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>VIN Number</TableHead>
                    <TableHead>Ownership Type</TableHead>
                    <TableHead>License Type</TableHead>
                    <TableHead>License Number</TableHead>
                    <TableHead>License Expiry</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                {/* <TableBody>
                  {vehicles.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground py-8"
                      >
                        No vehicles found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    vehicles.map((v) => (
                      <TableRow key={v.id}>
                        <TableCell>{v.id}</TableCell>
                        <TableCell>{v.vin}</TableCell>
                        <TableCell>{v.ownershipType}</TableCell>
                        <TableCell>{v.licenseType}</TableCell>
                        <TableCell>{v.licenseNumber}</TableCell>
                        <TableCell>{v.licenseExpiry}</TableCell>
                        <TableCell>{v.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody> */}
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}