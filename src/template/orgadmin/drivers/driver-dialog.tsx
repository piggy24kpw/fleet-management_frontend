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

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { useShallow } from 'zustand/react/shallow'
import useDriverDialog from "../drivers/store"
import { createDriver, updateDriver } from "@/api/orgadmin/drivers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CarIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { Driver } from "@/api/orgadmin/drivers/driver"

export default function DriverDialog() {
  const { isOpen, setIsOpen, driver: storeDriver, account } = useDriverDialog(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      driver: state.driver,
      account: state.account
    }))
  )

  const [driver, setDriver] = useState<Driver | undefined>();

  useEffect(() => {
    setDriver(storeDriver)
  }, [setDriver])


  const driverSchema = z.object({
  accountId: z.number().min(1, "Account Id is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseType: z.string().min(1, "License type is required"),
  licenseExpiry: z.string().min(1, "License expiry is required"),
  status: z.enum(["ACTIVE", "AVAILABLE"]),
  //vehicleIds: z.array(z.number()).optional(), // optional for now
})


  const form = useForm<z.infer<typeof driverSchema>>({
  resolver: zodResolver(driverSchema),
  defaultValues: {
    accountId: account ?? 0,
    licenseNumber: driver?.licenseNumber ?? "",
    licenseType: driver?.licenseType ?? "",
    licenseExpiry: driver?.licenseExpiry ?? "",
    status: driver?.status ?? "",
    // vehicleIds: Array.isArray(driver?.vehicle_id)
    //   ? (driver.vehicle_id as number[])
    //   : driver?.vehicle_id
    //   ? [driver.vehicle_id as number]
    //   : [],
  },
})


const accountId = account


  const handleSubmit = async (values: z.infer<typeof driverSchema>) => {
  const { ...formData } = values

  try {
    if (driver) {
      await updateDriver(formData, driver)
    } else {
     await createDriver(formData)
    }

    setIsOpen(false)
    form.reset()
  } catch (error) {
    console.error("Error saving driver:", error)
  }
}



  return (

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-md rounded-2xl border shadow-xl bg-white/90 backdrop-blur-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
              <CarIcon className="w-6 h-6 text-blue-500" />
              {driver ? 'Update Driver' : 'Create Driver'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

              <input type="hidden" {...form.register("accountId")} value={account}></input>

                {/* License Type */}
                <FormField
                  control={form.control}
                  name="licenseType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Type</FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(String(val))} 
                        value={field.value?.toString()} 
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select license type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>

                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* License Number */}
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                {/* License Expiry */}
                <FormField
                  control={form.control}
                  name="licenseExpiry"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>License Expiry</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined} // string → Date
                              onSelect={(date) =>
                                field.onChange(date ? date.toISOString().split("T")[0] : "")
                              } // Date → string
                              initialFocus
                            />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between border p-3 rounded-lg">
                      <FormLabel className="text-base font-medium">Status</FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(String(val))} 
                        value={field.value?.toString()} 
                      >
                      <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                        </SelectContent>
                        </Select>
                    </FormItem>
                  )}
                />

                {/* Vehicle IDs */}
                {/* <FormItem>
                  <FormLabel>Assign Vehicles</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {["101", "102", "103", "104"].map((id) => (
                      <Badge
                        key={id}
                        variant={selectedVehicles.includes(id) ? "default" : "outline"}
                        onClick={() => handleVehicleToggle(id)}
                        className="cursor-pointer"
                      >
                        Vehicle #{id}
                      </Badge>
                    ))}
                  </div>
                </FormItem> */}

                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}







