import { UserNavbar } from "@/components/navbar/user_nav"
import { NavigationMenu } from "@/components/ui/navigation-menu"

export default function UserLayout({children,}:{children: React.ReactNode}){
    return (
        <>
            <div>{children}</div>
        </>
    )
}