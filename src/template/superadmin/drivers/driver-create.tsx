'use client'

import { Button } from "@/components/ui/button";
import useDriverDialog from "./store";


export default function DriverCreateButton() {
    const { isOpen , setIsOpen, setDriver }  = useDriverDialog.getState()

    return <Button onClick={ () => {setDriver(undefined); setIsOpen(true)}} >Create</Button>
}