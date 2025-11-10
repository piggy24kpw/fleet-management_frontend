import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type DriverDialogStore = {
    isOpen : boolean,
    setIsOpen : (isOpen : boolean) => void,
    driver? : Driver,
    setDriver : (driver? : Driver | undefined) => void
}

const useDriverDialog = create<DriverDialogStore>()(
  persist(
    (set, get) => ({  
        isOpen: false,
        driver: undefined,  
       setIsOpen: (value: boolean) => set({ isOpen: value}),
        setDriver: (driver: Driver | undefined) => set({ driver: driver})
    }),
    {
      name: 'driver-dialog', 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
)

export default useDriverDialog