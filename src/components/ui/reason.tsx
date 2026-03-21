"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios_instance from "@/config/axios";
import { Button } from "./button";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateReasonPage from "./create.ren";
import toast from "react-hot-toast";
import { Input } from "./input";

interface Reason {
  _id: string;
  name: string;
  createdAt: string;
}

export default function ReasonListPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [reason, setReason] = useState<Reason[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  /* 🔥 HAND SCROLL FUNCTION */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget;
    let startX = e.pageX - slider.offsetLeft;
    let scrollLeft = slider.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reasonList", { page, limit }],
    queryFn: async () => {
      const res = await axios_instance.get(
        `/reasons?limit=${limit}&page=${page}`
      );
      setReason(res.data.data.findAllReason);
      return res.data.data;
    },
  });

  const pageInfo = data?.pagination || {
    totalReasons: 0,
    limit: 5,
    page: 1,
  };

  const filteredData = useMemo(() => {
    if (!reason) return [];
    if (!search.trim()) return reason;

    return reason.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, reason]);

  const deleteReason = useMutation({
    mutationFn: async (id: string) => {
      return await axios_instance.delete(`/reasons/dashboard/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reasonList"] });
      toast.success("Reason deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Error while deleting");
    },
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load reasons</div>;

  return (
    <div className="bg-muted h-screen w-full flex justify-center overflow-hidden cursor-grab active:cursor-grabbing">

      {/* PAGE SCROLL */}
      <div className="w-full max-w-4xl h-full overflow-y-auto p-4 md:p-10 space-y-4">

        {/* Heading */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">Reason</h2>
          </CardContent>
        </Card>

        {/* Search + Add */}
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3 justify-between">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full sm:max-w-sm"
            />

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto cursor-grab active:cursor-grabbing">
                  Add +
                </Button>
              </DialogTrigger>
              <DialogContent>
                <CreateReasonPage
                  open={isOpen}
                  onOpenChange={() => setIsOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Report Reason List
            </h2>

            {/* HAND SCROLL */}
            <div
              onMouseDown={handleMouseDown}
              className="overflow-x-auto max-h-[400px] overflow-y-auto 
              cursor-grab active:cursor-grabbing select-none 
              [&_*]:cursor-grab active:[&_*]:cursor-grabbing"
            >
              <table className="w-full text-sm min-w-[600px]">

                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Reason</th>
                    <th className="p-3 text-left">Created</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item._id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 text-gray-600">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "-"}
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-2">

                            <Button
                              size="icon"
                              variant="ghost"
                              className="cursor-pointer"
                              onClick={() => setDeleteId(item._id)}
                            >
                              <Trash2 className="text-red-500" size={16} />
                            </Button>

                            <Dialog
                              open={deleteId === item._id}
                              onOpenChange={() => setDeleteId(null)}
                            >
                              <DialogContent>
                                <div className="space-y-4">
                                  <h2 className="text-lg font-semibold">
                                    Delete this reason?
                                  </h2>

                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => {
                                        deleteReason.mutate(item._id);
                                        setDeleteId(null);
                                      }}
                                      className="bg-blue-600 text-white"
                                    >
                                      Delete
                                    </Button>

                                    <Button
                                      variant="outline"
                                      onClick={() => setDeleteId(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer"
                            >
                              <Pencil className="text-blue-500" size={16} />
                            </Button>

                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-10 text-center text-gray-400 italic"
                      >
                        No matching reasons found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 p-4 border rounded-lg bg-white">
          <div className="flex gap-4">
            <span>
              Page {page} |{" "}
              {Math.ceil(pageInfo.totalReasons / pageInfo.limit)}
            </span>
            <span>
              {Math.min(
                pageInfo.limit * page,
                pageInfo.totalReasons
              )}{" "}
              / {pageInfo.totalReasons}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              variant="outline"
              className="cursor-grab active:cursor-grabbing"
            >
              Previous
            </Button>

            <Button
              disabled={pageInfo.limit * page >= pageInfo.totalReasons}
              onClick={() => setPage((p) => p + 1)}
              variant="outline"
              className="cursor-grab active:cursor-grabbing"
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}