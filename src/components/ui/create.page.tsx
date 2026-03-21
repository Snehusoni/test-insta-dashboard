"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios_instance from "@/config/axios";
import toast from "react-hot-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from "@/types/job";

interface CreateJobPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: jobs | null;
}

export default function CreateJobPage({
  open,
  onOpenChange,
  job,
}: CreateJobPageProps) {
  const queryClient = useQueryClient();

  /* FORM STATE */
  const [title, setTitle] = useState(job?.title || "");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [experience, setExperience] = useState("");
  const [minSalary, setMinSalary] = useState<number | "">("");
  const [maxSalary, setMaxSalary] = useState<number | "">("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "draft" | "published" | "on hold" | "closed" | "archived"
  >("draft");

  /* PREFILL WHEN EDITING */
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDepartment(job.department);
      setLocation(job.location);
      setWorkType(job.work_type);
      setExperience(job.experience_level);
      setMinSalary(job.salary_range.min);
      setMaxSalary(job.salary_range.max);
      setRequirements(job.requirements.join(", "));
      setDescription(job.description || "");
      setStatus(job.status);
    } else {
      resetForm();
    }
  }, [job, open]);

  const resetForm = () => {
    setTitle("");
    setDepartment("");
    setLocation("");
    setWorkType("");
    setExperience("");
    setMinSalary("");
    setMaxSalary("");
    setRequirements("");
    setDescription("");
    setStatus("draft");
  };

  /* MUTATION */
  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
        department,
        location,
        work_type: workType,
        experience_level: experience,
        salary_range: {
          min: Number(minSalary),
          max: Number(maxSalary),
        },
        requirements: requirements
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean),
        description,
        status,
      };

      if (job?._id) {
        return axios_instance.patch(`/job/dashboard/${job._id}`, payload);
      }

      return axios_instance.post("/job/dashboard", payload);
    },

    onSuccess: () => {
      toast.success(
        job ? "Job updated successfully" : "Job created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["jobList"] });
      onOpenChange(false);
      resetForm();
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  /* SUBMIT */
  const handleSubmit = () => {
    if (!title || !department || !location) {
      toast.error("Please fill required fields");
      return;
    }

    mutation.mutate();
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-4 p-0">

        <Input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Input
          placeholder="Work Type (Remote / Hybrid / Onsite)"
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
        />

        <Input
          placeholder="Experience Level"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min Salary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.valueAsNumber || "")}
          />
          <Input
            type="number"
            placeholder="Max Salary"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.valueAsNumber || "")}
          />
        </div>

        <Input
          placeholder="Requirements (comma separated)"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        {/* Description Box */}
        <Textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="on hold">On Hold</option>
          <option value="closed">Closed</option>
          <option value="archived">Archived</option>
        </select>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            {job ? "Update Job" : "Create Job"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}