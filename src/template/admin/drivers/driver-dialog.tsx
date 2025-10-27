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
import { create, update } from "./actions"
import { useShallow } from 'zustand/react/shallow'
import useDriverDialog from "./store"

export default function DriverDialog() {
  const { isOpen, setIsOpen, driver } = useDriverDialog(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      driver: state.driver
    }))
  )

  const driverSchema = z.object({
    user_id: z.string().min(1, "User ID is required"),
    license_number: z.string().optional(),
    license_expiry: z.string().optional(),
    license_type: z.string().optional(),
    status: z.enum(['active', 'avability']).optional(),
  })

  const form = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      user_id: driver?.user_id ?? "",
      license_number: driver?.license_number ?? "",
      license_expiry: driver?.license_expiry ?? "",
      license_type: driver?.license_type ?? "",
      status: driver?.status ?? "active",
    },
  })

  const handleSubmit = async (values: z.infer<typeof driverSchema>) => {
    if (driver) {
      await update({
        ...values,
        user_id: values.user_id,
        license_number: values.license_number ?? "",
        license_expiry: values.license_expiry ?? "",
        license_type: values.license_type ?? "",
        status: values.status ?? "active",
      })
    } else {
      await create({
        ...values,
        license_number: values.license_number ?? "",
        license_expiry: values.license_expiry ?? "",
        license_type: values.license_type ?? "",
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
            {driver ? 'Update Driver' : 'Create Driver'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter User ID" {...field} className="focus-visible:ring-2" />
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
                name="license_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter License Type" {...field} />
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
                {driver ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
