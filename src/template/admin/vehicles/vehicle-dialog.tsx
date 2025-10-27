'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { useShallow } from 'zustand/react/shallow'
import useVehicleDialog from "./store"
import { create, update } from "../vehicles/actions"
import VehicleListTemplate from "./vehicle-list"


export default function VehicleDialog() {
  const { isOpen, setIsOpen, vehicle } = useVehicleDialog(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      vehicle: state.vehicle
    }))
  )

  const vehicleSchema = z.object({
    vinNo: z.string().min(1, "User ID is required"),
    model: z.string().optional(),
    license_number: z.string().optional(),
    license_expiry: z.string().optional(),
    year: z.number().optional(),
    driverIds: z.array(z.string()).optional(),
    manufacturerId: z.number().optional(),
    insuranceIds: z.array(z.string()).optional(),
    vehicle_type: z.string().optional(),
    type: z.string().optional(),
    ownership_type: z.string().optional(),
    status: z.enum(['active', 'inactive', 'maintenance']).optional(),
  })

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
        vinNo: vehicle?.vinNo ?? "",
        model: vehicle?.model ?? "",
        license_number: vehicle?.licenseNo ?? "",
        license_expiry: vehicle?.licenseExpiry ?? "",
        year: vehicle?.year ?? new Date().getFullYear(),
        driverIds: vehicle?.driverIds?.map(String) ?? [],
        manufacturerId: vehicle?.manufacturerId ?? 0,
        insuranceIds: vehicle?.insuranceIds?.map(String) ?? [],
        vehicle_type: vehicle?.vehicle_type ?? "",
        type: vehicle?.type ?? "",
        ownership_type: vehicle?.ownership_type ?? "",
        status: vehicle?.status ?? "active",
    },
  })

  const handleSubmit = async (values: z.infer<typeof vehicleSchema>) => {
    if (vehicle) {
      await update({
        ...values,
        vinNo: vehicle.vinNo,
        model: vehicle.model,
        year: vehicle.year,
        driverIds: vehicle.driverIds,
        manufacturerId: vehicle.manufacturerId,
        insuranceIds: vehicle.insuranceIds,
        vehicle_type: vehicle.vehicle_type,
        type: vehicle.type,
        ownership_type: vehicle.ownership_type,     
        licenseNo: values.license_number ?? "",
        licenseExpiry: values.license_expiry ?? "",
        status: values.status ?? "active",
      })
    } else {
      await create({
        ...values,
        vinNo: values.vinNo,
        model: values.model ?? "",
        year: values.year ?? new Date().getFullYear(),
        driverIds: values.driverIds ? values.driverIds.map(Number) : [],
        manufacturerId: values.manufacturerId ?? 0,
        insuranceIds: values.insuranceIds ? values.insuranceIds.map(String) : [],
        vehicle_type: values.vehicle_type ?? "",
        type: values.type ?? "",
        ownership_type: values.ownership_type ?? "",    
        licenseNo: values.license_number ?? "",
        licenseExpiry: values.license_expiry ?? "",
        status: values.status ?? "active",
      })
    }

    setIsOpen(false)
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-md rounded-2xl border shadow-xl bg-white/90 backdrop-blur-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {vehicle ? 'Update Vehicle' : 'Create Vehicle'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="vinNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vin Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vin Number" {...field} className="focus-visible:ring-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vehicle Model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="license_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter License Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="license_expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vehicle_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vehicle Type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4 border-t">
              <DialogClose asChild>
                <Button variant="outline" className="w-24">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="w-28">
                {vehicle ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
