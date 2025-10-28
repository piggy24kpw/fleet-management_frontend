import { Car, CarFront, ChartLine, Route, Settings, UserRound } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: ChartLine,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UserRound,
  },
  {
    title: "Drivers",
    url: "/admin/drivers",
    icon: CarFront,
  },
  {
    title: "Vehicles",
    url: "/admin/vehicles",
    icon: Car,
  },
  {
    title: "Routes",
    url: "/admin/routes",
    icon: Route,
  },
  {
    title: "Vehicle Manufacturers",
    url: "/admin/vehicle_manufacturer",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}