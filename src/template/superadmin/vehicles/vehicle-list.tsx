'use client'

import { useEffect, useState } from "react";
import { getAllVehicles } from "@/api/superadmin/vehicles";
import { TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import VehicleCreateButton from "./vehicle-create";
import VehicleCreateDialog from "./vehicle-dialog";
import { Button } from "@/components/ui/button";

export default function VehicleListTemplate() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllVehicles(page, 10);
        const vehiclesArray = (data?.contents ?? []).map(v => ({
          ...v,
          drivers: Array.isArray(v.drivers) ? v.drivers : (v.drivers ? [v.drivers] : []),
          organizations: Array.isArray(v.organizations) ? v.organizations : (v.organizations ? [v.organizations] : [])
        }));
        setVehicles(vehiclesArray);
        setTotalPages(data?.pager?.totalPage ?? 1);
      } catch {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [page]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Vehicle List</h1>
        <div className="flex gap-2">
          <VehicleCreateButton />
          <VehicleCreateDialog />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>License No</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Energy</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Drivers</TableHead>
              <TableHead>Organizations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-red-500">{error}</TableCell>
              </TableRow>
            ) : vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">No vehicles found</TableCell>
              </TableRow>
            ) : (
              vehicles.map((v, i) => (
                <TableRow key={i}>
                  <TableCell>{v.licenseNo}</TableCell>
                  <TableCell>{v.model}</TableCell>
                  <TableCell>{v.vehicleType}</TableCell>
                  <TableCell>{v.energyType}</TableCell>
                  <TableCell>{v.status}</TableCell>
                  <TableCell>
  {v.drivers.map((d: { username?: string } | string) =>
    typeof d === 'string' ? d : d.username
  ).join(", ")}
</TableCell>

<TableCell>
  {v.organizations.map((o: { name?: string } | string) =>
    typeof o === 'string' ? o : o.name
  ).join(", ")}
</TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button disabled={page === 0 || loading} onClick={() => setPage(page - 1)}>Previous</Button>
        <span className="text-gray-600">Page {page + 1} of {totalPages}</span>
        <Button disabled={page + 1 >= totalPages || loading} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  )
}
