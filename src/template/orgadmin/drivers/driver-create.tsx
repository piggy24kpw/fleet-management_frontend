'use client'

import { Button } from "@/components/ui/button";
import useDriverDialog from "./store";

interface DriverCreateButtonProps {
  accountId: number;
}

export default function DriverCreateButton({ accountId }: DriverCreateButtonProps) {
    const { setIsOpen, setDriver, setAccount } = useDriverDialog.getState();

    const handleClick = () => {
        setDriver(undefined);
        setIsOpen(true);
        setAccount(accountId)
    }

    return <Button onClick={handleClick}>Assign Driver</Button>;
}
