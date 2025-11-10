'use client';

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { createVehicle } from "@/api/superadmin/vehicles";
import { getAllDriversIdAndNames, getAllManufacturers } from "@/api/superadmin/drivers";
import { getAllInsurancesIdAndNames } from "@/api/superadmin/insurances";
import useVehicleDialog from "./store";
import { authStore } from "@/template/store/auth-result.store";
import { UUID } from "crypto";

export default function VehicleCreateDialog() {
  const { isOpen, setIsOpen } = useVehicleDialog();
  const auth = authStore((state) => state.auth);
  const orgId = auth?.organizationId || 0;
  const router = useNavigate();

  const [drivers, setDrivers] = useState<any[]>([]);
  const [insurances, setInsurances] = useState<any[]>([]);
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const vehicleTypes = ['SEDAN','SUV','TRUCK','VAN','BUS','PICKUP','MOTORCYCLE','TRAILER','HEAVY_MACHINERY'];
  const energyTypes = ['EV','HEV','PHEV','PETROL','DIESEL','CNG','LPG','HYDROGEN'];
  const ownershipTypes = ['COMPANY_OWNED','LEASED','RENTED','EMPLOYEE_OWNED','GOVERNMENT_OWNED','THIRD_PARTY_OWNED','LOANED','FINANCE_OWNED'];
  const statusTypes = ['MAINTENANCE','IN_USE','SENT_TO_LOCATION','RETURNING','AVAILABLE'];

  const fetchManufacturers = useCallback(async () => {
    try {
      const data = await getAllManufacturers(orgId);
      setManufacturers(data || []);
    } catch {
      setError("Failed to load manufacturers");
    }
  }, [orgId]);

  const fetchDrivers = useCallback(async () => {
    try {
      const data = await getAllDriversIdAndNames(orgId);
      setDrivers(data || []);
    } catch {
      setError("Failed to load drivers");
    }
  }, [orgId]);

  const fetchInsurances = useCallback(async () => {
    try {
      const data = await getAllInsurancesIdAndNames(orgId);
      setInsurances(data || []);
    } catch {
      setError("Failed to load insurances");
    }
  }, [orgId]);

  useEffect(() => {
    if (isOpen) {
      fetchDrivers();
      fetchInsurances();
      fetchManufacturers();
    }
  }, [isOpen, fetchDrivers, fetchInsurances, fetchManufacturers]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const vehicleData = {
      vinNo: (form.vinNo as HTMLInputElement).value,
      model: (form.model as HTMLInputElement).value,
      licenseNo: (form.licenseNo as HTMLInputElement).value,
      licenseExpiry: new Date((form.licenseExpiry as HTMLInputElement).value),
      year: parseInt((form.year as HTMLInputElement).value),
      driverIds: [(form.driverId as HTMLSelectElement).value ? parseInt((form.driverId as HTMLSelectElement).value) : null].filter(Boolean),
      manufacturerId: parseInt((form.manufacturerId as HTMLInputElement).value),
      insuranceIds: [(form.insuranceId as HTMLSelectElement).value as unknown as UUID].filter(Boolean),
      vehicleType: (form.vehicleType as HTMLSelectElement).value,
      energyType: (form.energyType as HTMLSelectElement).value,
      ownershipType: (form.ownershipType as HTMLSelectElement).value,
      organizationIds: [orgId],
      status: (form.status as HTMLSelectElement).value,
      photos: (form.photos as HTMLInputElement).files || null
    };

    try {
      const formData = new FormData();
      formData.append('form', new Blob([JSON.stringify(vehicleData)], { type: 'application/json' }));
      if (vehicleData.photos) {
        Array.from(vehicleData.photos).forEach(file => formData.append('files', file));
      }

      await createVehicle(formData);
      setIsOpen(false);
      router('/superadmin/vehicles');
    } catch {
      setError("Failed to create vehicle.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Create Vehicle</h2>

        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Fields */}
          <div className="grid grid-cols-2 gap-4">
            <input name="vinNo" type="text" placeholder="VIN No" required className="input"/>
            <input name="model" type="text" placeholder="Model" required className="input"/>
            <input name="licenseNo" type="text" placeholder="License No" required className="input"/>
            <input name="licenseExpiry" type="date" required className="input"/>
            <input name="year" type="number" placeholder="Year" min="1990" max="2099" required className="input"/>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select name="manufacturerId" className="input">
              <option value="">Select Manufacturer</option>
              {manufacturers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select name="driverId" className="input">
              <option value="">Select Driver</option>
              {drivers.map(d => <option key={d.id} value={d.id}>{d.username}</option>)}
            </select>

            <select name="insuranceId" className="input">
              <option value="">Select Insurance</option>
              {insurances.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>

            <select name="vehicleType" required className="input">
              <option value="">Vehicle Type</option>
              {vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
            </select>

            <select name="energyType" required className="input">
              <option value="">Energy Type</option>
              {energyTypes.map(e => <option key={e} value={e}>{e}</option>)}
            </select>

            <select name="ownershipType" required className="input">
              <option value="">Ownership Type</option>
              {ownershipTypes.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            <select name="status" required className="input">
              <option value="">Status</option>
              {statusTypes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <input name="photos" type="file" multiple accept="image/*" className="col-span-2 input"/>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-gray" onClick={() => setIsOpen(false)}>Cancel</button>
            <button type="submit" className="btn-blue">Create Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  )
}
