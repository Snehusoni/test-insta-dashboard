"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios_instance from "@/config/axios";
import { useRouter } from "next/navigation";
import { Input } from "./input";
import { Button } from "./button";
import toast from "react-hot-toast";

interface CreateReasonPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateReasonPage({
  open,
  onOpenChange,
}: CreateReasonPageProps) {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error("Please enter a reason");
      return;
    }

    try {
      setLoading(true);

      const result = await axios_instance.post("/reasons/dashboard", {
        name: reason.trim(),
      });

      if (result.data?.success) {
        toast.success("Reason created successfully");
        setReason("");
        onOpenChange(false);
        router.refresh(); // better than push if already on the page
      } else {
        toast.error("Reason already exists");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Create Report Reason</h2>

          <Input
            placeholder="Reason title"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-800 text-white"
            >
              {loading ? "Creating..." : "Create"}
            </Button>

            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
