"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios_instance from "@/config/axios";
import toast from "react-hot-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Pencil, Trash2 } from "lucide-react";
import UpdatePage from "./Update.job";
import CreateJobPage from "./create.page";

interface SalaryRange {
  min: number;
  max: number;
}

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  work_type: string;
  experience_level: string;
  salary_range: SalaryRange;
  description: string;
  requirements: string[];
  status: "draft" | "active" | "closed";
  createdAt: string;
  updatedAt: string;
}

export default function JobListPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const { data: jobs = [], isLoading, isError } = useQuery({
    queryKey: ["jobList"],
    queryFn: async () => {
      const res = await axios_instance.get("/job/dashboard");
      return res.data.data as Job[];
    },
  });

  const filteredJobs = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return jobs;

    return jobs.filter((job) =>
      [
        job.title,
        job.department,
        job.location,
        job.work_type,
        job.experience_level,
        job.status,
        job.requirements.join(" "),
        `${job.salary_range.min} ${job.salary_range.max}`,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [jobs, search]);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      axios_instance.delete(`/job/dashboard/${id}`),

    onSuccess: () => {
      toast.success("Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["jobList"] });
    },

    onError: () => {
      toast.error("Failed to delete job");
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load jobs</div>;
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-muted px-4 md:px-10 py-6 cursor-grab active:cursor-grabbing">

      <div className="w-full max-w-7xl space-y-5">

        {/* TITLE */}
        <Card>
          <CardContent className="p-5 text-lg font-semibold">
            Jobs
          </CardContent>
        </Card>

        {/* SEARCH + ADD */}
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:flex-1 h-11 cursor-grab active:cursor-grabbing"
              />

              <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto h-11 px-6 cursor-grab active:cursor-grabbing">
                    Add +
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Job</DialogTitle>
                  </DialogHeader>

                  <CreateJobPage
                    open={openCreate}
                    onOpenChange={() => setOpenCreate(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card>
          <CardContent className="p-0">

            {/* 🔥 HAND SCROLL AREA */}
            <div
              onMouseDown={handleMouseDown}
              className="overflow-x-auto max-h-[520px] overflow-y-auto 
              cursor-grab active:cursor-grabbing select-none 
              [&_*]:cursor-grab active:[&_*]:cursor-grabbing"
            >
              <table className="w-full text-sm min-w-[900px]">

                <thead className="sticky top-0 bg-muted z-10">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Work Type</th>
                    <th className="p-3 text-left">Experience</th>
                    <th className="p-3 text-left">Salary</th>
                    <th className="p-3 text-left">Requirements</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-right pr-5">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="py-10 text-center text-muted-foreground italic"
                      >
                        No matching jobs found.
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job) => (
                      <tr key={job._id} className="border-t hover:bg-muted/50">
                        <td className="p-3 font-medium">{job.title}</td>
                        <td className="p-3">{job.department}</td>
                        <td className="p-3">{job.location}</td>
                        <td className="p-3">{job.work_type}</td>
                        <td className="p-3">{job.experience_level}</td>
                        <td className="p-3 whitespace-nowrap">
                          ₹{job.salary_range.min.toLocaleString()} – ₹
                          {job.salary_range.max.toLocaleString()}
                        </td>
                        <td className="p-3 max-w-xs truncate">
                          {job.requirements.join(", ")}
                        </td>
                        <td className="p-3 capitalize">{job.status}</td>

                        <td className="p-3 pr-5 flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedJob(job);
                              setOpenEdit(true);
                            }}
                          >
                            <Pencil size={18} className="text-blue-500" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => setDeleteId(job._id)}
                          >
                            <Trash2 size={18} className="text-red-500" />
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

        {/* EDIT */}
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
            </DialogHeader>

            <UpdatePage
              open={openEdit}
              onOpenChange={setOpenEdit}
              job={selectedJob}
            />
          </DialogContent>
        </Dialog>

        {/* DELETE */}
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Job?</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>

              <Button
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => {
                  if (deleteId) deleteMutation.mutate(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}