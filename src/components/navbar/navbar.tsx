'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell, LogOut, Settings } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex sticky top-0 items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      
      {/* Left side: Logo or page title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold tracking-wide">Fleet Management</h1>
      </div>

      {/* Right side: Notifications and Profile */}
      <div className="flex items-center space-x-4">

        {/* Notification button */}
        <Button variant="ghost" className="relative text-white hover:bg-blue-500/40">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 hover:bg-blue-500/40 px-2 py-1 rounded-md transition">
              <Avatar className="h-8 w-8 border border-white/40">
                <AvatarImage src="/user-avatar.jpg" alt="User Avatar" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <span className="font-medium">Admin</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="mt-2 bg-white text-gray-800 shadow-lg rounded-md">
            <DropdownMenuItem className="hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2 text-gray-600" />
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100">
              <LogOut className="w-4 h-4 mr-2 text-gray-600" />
              <Link href="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  )
}
