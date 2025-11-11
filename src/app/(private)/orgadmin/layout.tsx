'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "@/components/navbar/navbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        {/* Sidebar on the left */}
        <AppSidebar />

        {/* Main content area */}
        <main className="flex-1 w-full px-6 py-6 overflow-x-auto">
          <Navbar></Navbar>
          <SidebarTrigger />
          {children}
        </main>
        
      </div>
    </SidebarProvider>
  )
}


