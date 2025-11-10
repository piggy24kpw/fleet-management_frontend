'use client';
import { getAllVehicleManufacturers } from "@/api/superadmin/vehicle_manufacturer"
import VehicleManufacturerListTemplate from "@/template/superadmin/vehicle_manufacturer/manufacturer-list"
import { useEffect, useState } from "react";

export default async function VehicleManufacturerPage() {
  return (
    <div>
      <VehicleManufacturerListTemplate />
    </div>
  )
}
