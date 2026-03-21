"use client";
import Sidebar from "@/components/Sidebar"
import Reason from "@/components/ui/reason";

export default function UsersTable() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar/>
      <Reason/>
    </div>
  )
}
