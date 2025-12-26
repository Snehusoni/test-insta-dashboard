"use client";
import Sidebar from "@/components/Sidebar"
import UserList from "@/components/ui/user-list";

export default function UsersTable() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar/>
      <UserList />
    </div>
  )
}
