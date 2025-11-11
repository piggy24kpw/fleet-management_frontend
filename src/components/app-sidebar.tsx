"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  UserRound,
  Shield,
  Car,
  Route,
  Wrench,
  FileText,
  Factory,
} from "lucide-react"
import { title } from "process"

const items = [
  { title: "Dashboard", url: "/orgadmin", icon: LayoutDashboard },
  { title: "Users", url: "/orgadmin/users", icon: UserRound },
  { title: "Drivers", url: "/orgadmin/drivers", icon: Shield },
  { title: "Vehicles", url: "/orgadmin/vehicles", icon: Car },
  { title: "Vehicle Manufacturer", url: "/orgadmin/vehicle_manufacturer", icon: Factory },
  { title: "Routes", url: "/orgadmin/routes", icon: Route },
  { title: "Maintenance", url: "/orgadmin/maintenance", icon: Wrench },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-64 min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col shadow-lg"
    >

      {/* --- Menu Items --- */}
      <nav className="flex-1 mt-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex items-center space-x-3 px-5 py-2.5 mx-3 rounded-xl text-white/90 transition-all duration-200",
                "hover:bg-blue-600 hover:text-white",
                isActive &&
                  "bg-blue-600 text-white shadow-md ring-1 ring-white/10"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* --- Footer (optional) --- */}
      <div className="mt-auto px-6 py-4 text-xs text-blue-100 border-t border-blue-400">
        © 2025 Fleet Management
      </div>
    </aside>
  )
}
