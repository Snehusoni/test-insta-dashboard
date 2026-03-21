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

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   type: string;
//   createdAt: string;
// }

// interface UsersResponse {
//   findAllUser: User[];
// }


export default function UserTable() {
  const [deSearch, setDeSearch] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(()=>{
    // if (search.length <= 2) return;
    if(search.length === 0) {
      setDeSearch("");
      return;
    }
    if(search.length >2) {
    
       const prvTime = setTimeout(() => {
      setDeSearch(search)
    },500)

    // next time will clear
    return ()=>clearTimeout(prvTime)
  }
  },[search])
  
  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["usersList",{deSearch,page,limit}],
    queryFn: async () => {
      
      const res = await axios_instance.get(`/users/dashboard/allUser?limit=${limit}&page=${page}&search=${deSearch}`);
      if (!res.data.success) {
        throw new Error(res.data.data.message);
      }
      return res.data.users;
    },
    enabled: search.length === 0 || search.length > 2, 

  });

  const BanUserMutation = useMutation({
    mutationFn:async (id:string) => {
      const response = await axios_instance.post(`/users/dashboard/ban/${id}`)
      console.log("when unban",id,response)
      return response.data
    },
    
    onSuccess:(data) => {
      toast.success(data.message || "user successfully ban")
    },
    
    onError:(error:any) => {
      toast.success( error.response?.data?.message || "Failed to ban user")
    }
  })
  
  const UnBanUserMutation = useMutation({
    mutationFn:async (id:string) => {
      const response = await axios_instance.post(`/users/dashboard/unban/${id}`)
      console.log("when unban",id,response)
      return response.data
    },

    onSuccess:(data) => {
      toast.success(data.message || "user successfully Unban")
    },

    onError:(error:any) => {
      toast.success( error.response?.data?.message || "Failed to Unban user")
    }
  })

  if (isLoading) {
    return <p className="p-4">Loading users...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Failed to load users</p>;
  }

  const users = data?.users ?? [];

  const handleSearch = (e:any)=>{
    e.preventDefault()
    setSearch(e.target.value);
    setPage(1);
  }
  return (
    
    <div className="bg-muted min-h-svh w-full p-6">
 <div className="max-w-4xl overflow-hidden ">
      {/*  title */}
       <Card>
          <CardContent className="px-4 ">
            <h2 className="text-base font-semibold text-gray-800 capitalize">User List</h2>
          </CardContent>
        </Card>

      {/* search */}
      <Card>
          <CardContent className="px-4 ">
            <div className="flex justify-between gap-4 sm:flex-row flex-col">
              <Input
                placeholder="Search"
                value={search }
                onChange={handleSearch}
                className="w-full max-w-md border rounded px-3 py-2 outline-none"
              />
              </div>
          </CardContent>
        </Card>
        <div className="">

      <Card className="w-full overflow-x-auto">
        <CardContent className="p-0">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50">
              <tr className="text-center">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Ban Reason</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">isBand</th>
              </tr>
            </thead>

            <tbody className="overflow-auto">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
               users.length > 0 && ( users.map((u:any) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3 text-blue-600 cursor-pointer">
                      <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${u.username}`} target="blank">{u.username}</Link>
                    </td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.banReason ? u.banReason : "-"}</td>
                    <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                        {/* <tr className="p-3 flex gap-2 justify-start cursor-pointer">
                          <td className=" text-blue-600 ">
                            <Eye size={16}/>
                          </td>
                          <td className=" text-red-600">
                            <Trash size={16}/>
                          </td>
                        </tr> */}

                  <div className="flex gap-4 justify-start items-center">
                      <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        <Eye size={16}/>
                      </button>
                      <button className="text-red-600 hover:text-red-800 cursor-pointer">
                        <Trash size={16}/>
                      </button>
                    </div>
                    </td>
                    <td>
                    <Button
                      className={`relative w-12 h-6 rounded-full transition p-3 ${
                        u.banned ? "bg-black" : "bg-gray-300"}`}

                        onClick={ () => (
                          u.banned 
                        ? UnBanUserMutation.mutate(u.id, { onSuccess: () => refetch() }) 
                        : BanUserMutation.mutate(u.id, { onSuccess: () => refetch() })
                        )}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                          u.banned ? "translate-x-6" : ""
                        }`}
                      />
                    </Button>
                    </td>
                    <td>
                      <p>
                        {u._id}
                      </p>
                    </td>
                  </tr>)
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
        </div>

       {/* Pagination Controls */}
       <div className="md:flex-row flex-col gap-5  p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-600">
        <strong className="flex gap-4">

         <span>  Page {page} | {Math.ceil((data.total)/limit) }</span> 
         <span> User {limit*page>data.total?data.total:limit*page } |{data?.total}</span> 
        </strong>
         <div className=" flex gap-2.5">

          <Button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 border  disabled:opacity-50"
            >
            Previous
          </Button>
          <Button 
          disabled = {limit*page>data.total}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 border rounded "
            >
            Next
          </Button>
            </div>
        </div>
    </div>
    </div>
  );
}



