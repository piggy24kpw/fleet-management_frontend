import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type VehicleManufacturerDialogStore = {
    isOpen : boolean,
    setIsOpen : (isOpen : boolean) => void,
    vehicle_manufacturer? : Vehicle_Manufacturer,
    setManufacturer : (vehicle_manufacturer? : Vehicle_Manufacturer | undefined) => void
}

const useVehicleManufacturerDialog = create<VehicleManufacturerDialogStore>()(
  persist(
    (set, get) => ({  
        isOpen: false,
        vehicle_manufacturer: undefined,  
       setIsOpen: (value: boolean) => set({ isOpen: value}),
        setManufacturer: (vehicle_manufacturer: Vehicle_Manufacturer| undefined) => set({ vehicle_manufacturer: vehicle_manufacturer})
    }),
    {
      name: 'vehicle_manufacturer-dialog', 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
)

export default useVehicleManufacturerDialog;