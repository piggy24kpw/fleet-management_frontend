'use server'
import vehicleAPI from '@/api/vehicles'
import { revalidatePath } from 'next/cache'

export const create = async (vehicle: Vehicle) => {
    await vehicleAPI.create(vehicle)
    revalidatePath("/vehicles")
}

export const update = async (vehicle: Vehicle) => {
    const res = await vehicleAPI.update(vehicle)
    console.log(res)
    revalidatePath("/vehicles")
}