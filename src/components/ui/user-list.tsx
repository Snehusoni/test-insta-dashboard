"use client";

import { Card, CardContent } from "@/components/ui/card";
import axios_instance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  type: string;
  createdAt: string;

}

interface UsersResponse {
  findAllUser: User[];
}

export default function UserTable() {
  const { data, isLoading, isError } = useQuery<UsersResponse>({
    queryKey: ["usersList"],
    queryFn: async () => {
      const res = await axios_instance.get("/users/dashboard/allUser");
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
  });

  if (isLoading) {
    return <p className="p-4">Loading users...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Failed to load users</p>;
  }

  const users = data?.findAllUser ?? [];

   
  return (
    <div className="bg-gray-100 min-h-screen w-screen p-6">
      <Card className="w-full overflow-x-auto">
        <CardContent className="p-0">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">View</th>
                <th className="p-3 text-left">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3 text-blue-600 cursor-pointer">
                  <Link href={`http://localhost:3000/${u.username}`} target="blank">{u.username}</Link>
                  </td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.type}</td>
                    <td className="p-3">{u.createdAt}</td>
                    <td className="p-3 text-blue-600 cursor-pointer">View</td>
                    <td className="p-3 text-red-600 cursor-pointer">Delete</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}



