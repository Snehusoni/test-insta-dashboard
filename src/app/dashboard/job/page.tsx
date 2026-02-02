"use client";
import Sidebar from "@/components/Sidebar"
import Job from "@/components/ui/job-list"



export default function UsersTable() {
  return (
    <div className="flex h-screen overflow-hidden">
       <Sidebar/> 
      <Job/>
    </div>
  )
}
