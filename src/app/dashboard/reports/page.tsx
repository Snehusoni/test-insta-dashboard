"use client";
import Sidebar from "@/components/Sidebar"
import Report from "@/components/ui/report";

export default function UsersTable() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar/>
      <Report />
    </div>
  )
}
