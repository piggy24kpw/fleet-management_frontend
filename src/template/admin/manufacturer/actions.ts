'use server'
import vehicle_manufacturerAPI from "@/api/vehicle_manufacturer"
import { revalidatePath } from 'next/cache'

export const create = async (vehicle_manufacturer: Vehicle_Manufacturer) => {
    await vehicle_manufacturerAPI.create(vehicle_manufacturer)
    revalidatePath("/manufacturers")
}

export const update = async (vehicle_manufacturer: Vehicle_Manufacturer) => {
    const res = await vehicle_manufacturerAPI.update(vehicle_manufacturer)
    console.log(res)
    revalidatePath("/manufacturers")
}