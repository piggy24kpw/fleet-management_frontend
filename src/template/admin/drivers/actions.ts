'use server'
import driverAPI from '@/api/drivers'
import { revalidatePath } from 'next/cache'

export const create = async (driver: Driver) => {
    await driverAPI.create(driver)
    revalidatePath("/drivers")
}

export const update = async (driver: Driver) => {
    const res = await driverAPI.update(driver)
    console.log(res)
    revalidatePath("/drivers")
}