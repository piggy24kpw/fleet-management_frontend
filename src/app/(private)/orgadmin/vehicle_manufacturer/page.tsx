'use client';
import { getAllVehicleManufacturers } from "@/api/orgadmin/vehicle_manufacturer"
import VehicleManufacturerListTemplate from "@/template/orgadmin/vehicle_manufacturer/manufacturer-list"
import { useEffect, useState } from "react";

export default async function VehicleManufacturerPage() {
  return (
    <div>
      <VehicleManufacturerListTemplate />
    </div>
  )
}
