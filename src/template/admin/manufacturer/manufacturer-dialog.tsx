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
import useVehicleManufacturerDialog from "./store"
import { create, update } from "./actions"
import { createManufacturer } from "@/api/auth/client"


export default function VehicleManufacturerDialog() {
  const { isOpen, setIsOpen, vehicle_manufacturer } = useVehicleManufacturerDialog(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      vehicle_manufacturer: state.vehicle_manufacturer
    }))
  )

  const manufacturerSchema = z.object({
    manufacturer_name: z.string().min(1, "Name is required"),
  })

  const form = useForm<z.infer<typeof manufacturerSchema>>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      manufacturer_name: vehicle_manufacturer?.name ?? "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof manufacturerSchema>) => {
    if (vehicle_manufacturer) {
      await update({
        ...values,
        name: values.manufacturer_name,
      })
    } else {
      await createManufacturer(values.manufacturer_name);
    }

    setIsOpen(false)
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        // className="max-w-md rounded-2xl border shadow-xl bg-white/90 backdrop-blur-lg"
        className="max-w-md gap-3 rounded-2xl px-6 shadow-outer bg-white transition-all hover:shadow-inner"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {vehicle_manufacturer ? 'Update Vehicle Manufacturer' : 'Create Vehicle Manufacturer'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="manufacturer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Manufacturer Name" {...field} className="focus-visible:ring-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <DialogFooter className="pt-4 border-t">
              <DialogClose asChild>
                <Button variant="customized" className="w-24">Cancel</Button>
              </DialogClose>
              <Button type="submit" variant="customized" className="w-28">
                {vehicle_manufacturer ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
