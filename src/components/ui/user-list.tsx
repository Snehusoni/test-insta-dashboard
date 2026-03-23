"use client";

import { Card, CardContent } from "@/components/ui/card";
import axios_instance from "@/config/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserTable() {
  const [deSearch, setDeSearch] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // debounce
  useEffect(() => {
    if (search.length === 0) {
      setDeSearch("");
      return;
    }

    if (search.length > 2) {
      const timer = setTimeout(() => {
        setDeSearch(search);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [search]);

  // API
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["usersList", { deSearch, page, limit }],
    queryFn: async () => {
      const res = await axios_instance.get(
        `/users/dashboard/allUser?limit=${limit}&page=${page}&search=${deSearch}`
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      return res.data; // ✅ FIX
    },
    enabled: search.length === 0 || search.length > 2,
  });

  // ✅ FIX
  const users = Array.isArray(data?.users) ? data.users : [];
  const total = data?.total || 0;

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ban
  const BanUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios_instance.post(`/users/dashboard/ban/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  // unban
  const UnBanUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios_instance.post(`/users/dashboard/unban/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  if (isLoading) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load users</p>;

  return (
    <div className="bg-muted min-h-svh w-full flex justify-center">

      {/* ✅ spacing FIX */}
      <div className="w-full max-w-4xl p-6 space-y-6">

        {/* TITLE */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-base font-semibold text-gray-800">
              User List
            </h2>
          </CardContent>
        </Card>

        {/* SEARCH */}
        <Card>
          <CardContent className="p-5">
            <Input
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left">Name</th>
                    <th className="px-5 py-3 text-left">Username</th>
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Ban Reason</th>
                    <th className="px-5 py-3 text-left">Created At</th>
                    <th className="px-5 py-3 text-left">Action</th>
                    <th className="px-5 py-3 text-left">isBand</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u: any) => (
                      <tr key={u.id} className="border-t hover:bg-gray-50">

                        <td className="px-5 py-3">{u.name}</td>

                        <td className="px-5 py-3 text-blue-600">
                          <Link
                            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${u.username}`}
                            target="_blank"
                          >
                            {u.username}
                          </Link>
                        </td>

                        <td className="px-5 py-3">{u.email}</td>

                        <td className="px-5 py-3">
                          {u.banReason || "-"}
                        </td>

                        <td className="px-5 py-3">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-5 py-3">
                          <div className="flex gap-4">
                            <Eye size={16} className="text-blue-600" />
                            <Trash size={16} className="text-red-600" />
                          </div>
                        </td>

                        <td className="px-5 py-3">
                          <Button
                            className={`relative w-12 h-6 rounded-full ${
                              u.banned ? "bg-black" : "bg-gray-300"
                            }`}
                            onClick={() =>
                              u.banned
                                ? UnBanUserMutation.mutate(u.id)
                                : BanUserMutation.mutate(u.id)
                            }
                          >
                            <span
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full ${
                                u.banned ? "translate-x-6" : ""
                              }`}
                            />
                          </Button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </CardContent>
        </Card>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-5 border rounded-lg text-sm">
          <span>
            Page {page} | {Math.ceil(total / limit)}
          </span>

          <div className="flex gap-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <Button
              disabled={limit * page >= total}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}