import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type VehicleDialogStore = {
    isOpen : boolean,
    setIsOpen : (isOpen : boolean) => void,
    vehicle? : Vehicle,
    setVehicle : (vehicle? : Vehicle | undefined) => void
}

const useVehicleDialog = create<VehicleDialogStore>()(
  persist(
    (set, get) => ({  
        isOpen: false,
        vehicle: undefined,  
       setIsOpen: (value: boolean) => set({ isOpen: value}),
        setVehicle: (vehicle: Vehicle | undefined) => set({ vehicle: vehicle})
    }),
    {
      name: 'vehicle-dialog', 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
)

export default useVehicleDialog