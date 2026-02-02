"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios_instance from "@/config/axios";
import { Button } from "./button";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateReasonPage from "./create.ren";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "./input";

interface Reason {
  _id: string;
  name: string;
  createdAt: string;
}

export default function ReasonListPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [search, setSearch] = useState("");

  const route = useRouter()

  //get report list
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reasonList"],
    queryFn: async () => {
      const res = await axios_instance.get("/reasons");
      // console.log("Type of data:", typeof res.data.data.findAllReason); 
      return res.data.data.findAllReason as Reason[];
    },
  });

  //filer reasons list
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data;

    const lowerSearch = search.toLowerCase();
    return data.filter((item) =>
      item.name?.toLowerCase().includes(lowerSearch)
    );
  }, [search, data]);

  //delete item from list of reason
  const queryClient = useQueryClient();

  const deleteReason = useMutation(
    {
      mutationFn : async (id:string) => {
        return await axios_instance.delete(`/reasons/dashboard/${id}`);
      },

      onSuccess:() => {
        queryClient.invalidateQueries({queryKey:["reasonList"]})
        toast.success("Reason deleted successfully")
      },

      onError:(err) => {
        toast.error(err.message||"Error while deleteing")
      }
    }
  )

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load reasons</div>;

  return (
    <div className="bg-muted min-h-svh w-full relative  p-6 md:p-10 flex">
      <div className="max-w-4xl overflow-hidden ">
        <Card>
          <CardContent className="px-4 ">
            <h2 className="text-base font-semibold text-gray-800 capitalize">Reason</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4 ">
            <div className="flex justify-between gap-4 sm:flex-row flex-col">
              <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md border rounded px-3 py-2 outline-none"
              />
              
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button 
                  className="bg-green-400 hover:bg-green-500 text-white font-bold 
                  md:w-[100px]  max-sm:w-full   max-w-md">
                    Add +
                  </Button>
                 
                </DialogTrigger>
                <DialogContent className="">
                  <CreateReasonPage open={isOpen} onOpenChange={() => setIsOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-x-auto w-full">
          <CardContent className="px-4 pt-6">
            <h2 className="text-lg font-semibold mb-4">Report Reason List</h2>

<div className="">
  
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody className="overflow-auto">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr className="border-t hover:bg-gray-50/50" key={item._id || index}>
                      <td className="p-1">{index + 1}</td>
                      <td className="p-1 font-medium">{item.name}</td>
                      <td className="p-1 text-gray-600">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          {/* <Button variant="ghost" size="icon" className="hover:bg-red-50">
                            <Trash2 className="text-red-500" size={20} />
                          </Button> */}
                          <Button 
                          size="icon" 
                          className="hover:bg-red-50 bg-transparent"
                          disabled={deleteReason.isPending} 
                          onClick={() => {
                            setIsOpenDel(!isOpenDel)
                          }}
                        >
                          <Trash2 className={deleteReason.isPending ? "text-gray-400" : "text-red-500"} size={20} />
                        </Button>
                        <Dialog open={isOpenDel} onOpenChange={()=>setIsOpenDel(!setIsOpenDel)}>
                              {/* <DialogTitle>deleting reason</DialogTitle> */}
                              <DialogContent>
                              <Card className="">
                                <CardContent className="space-y-4 ">
                                  <h2 className="text-xl font-semibold">Are you sure want to delete this reason</h2>
                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => {
                                        deleteReason.mutate(item._id);
                                        setIsOpenDel(false)
                                      }
                                    }
                                      // disabled={loading}
                                      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                                    >
                                      Delete
                                    </Button>

                                    <Button
                                      onClick={() => route.back()}
                                      className="px-4 py-2 border rounded bg-white text-primary"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                              </DialogContent>
                            </Dialog>
                          <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                            <Pencil className="text-blue-500" size={20} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-gray-400 italic">
                      No matching reasons found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}