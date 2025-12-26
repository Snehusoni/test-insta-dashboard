"use client"
import Sidebar from "@/components/Sidebar"
import Feed from "@/components/Feed"

export default function Home() {
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<Feed />
		</div>
	)
}
