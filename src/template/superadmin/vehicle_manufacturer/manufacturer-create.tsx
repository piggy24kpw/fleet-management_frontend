'use client'

import { Button } from "@/components/ui/button";
import useVehicleManufacturerDialog from "./store";
import { Plus } from "lucide-react";


export default function VehicleManufacturerCreateButton() {
    const { isOpen , setIsOpen, setManufacturer }  = useVehicleManufacturerDialog.getState()

    return <Button onClick={ () => {setManufacturer(undefined); setIsOpen(true)}} variant="customized">
        <Plus></Plus>Create</Button>
}
