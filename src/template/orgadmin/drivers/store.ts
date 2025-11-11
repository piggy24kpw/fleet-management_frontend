import { Driver } from "@/api/orgadmin/drivers/driver"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type DriverDialogStore = {
    isOpen : boolean,
    setIsOpen : (isOpen : boolean) => void,
    driver? : Driver,
    setDriver : (driver? : Driver | undefined) => void,
    account : number,
    setAccount : (account : number) => void
}

const useDriverDialog = create<DriverDialogStore>()(
  persist(
    (set, get) => ({  
        isOpen: false,
        driver: undefined,
        account: 0,
       setIsOpen: (value: boolean) => set({ isOpen: value}),
        setDriver: (driver: Driver | undefined) => set({ driver: driver}),
        setAccount: (account: number) => set({account : account})
        
    }),
    {
      name: 'driver-dialog', 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
)

export default useDriverDialog