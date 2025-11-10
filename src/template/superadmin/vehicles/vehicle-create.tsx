'use client'

import { Button } from "@/components/ui/button";
import useVehicleDialog from "./store";

export default function VehicleCreateButton() {
  const { setIsOpen, setVehicle } = useVehicleDialog.getState();

  return (
    <Button
      variant="default"
      className="bg-blue-600 hover:bg-blue-700 text-white"
      onClick={() => { setVehicle(undefined); setIsOpen(true); }}
    >
      Create Vehicle
    </Button>
  )
}
