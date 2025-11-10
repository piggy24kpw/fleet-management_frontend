'use client'

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useVehicleDialog from "./store";


export default function VehicleManufacturerCreateButton() {
    const { isOpen , setIsOpen, setVehicle }  = useVehicleDialog.getState()

    return <Button onClick={ () => {setVehicle(undefined); setIsOpen(true)}} variant="customized">
        <Plus></Plus>Create</Button>
}
