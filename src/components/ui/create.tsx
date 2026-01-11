"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios_instance from "@/config/axios";
import { useRouter } from "next/navigation";

export default function CreateReasonPage() {
  const router = useRouter();
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert("Reason is required");
      return;
    }

    try {
      setLoading(true);
      const ex= await axios_instance.post("/reasons/dashboard", {

        name:reason,
      
      });
     console.log(reason)

      alert("Reason created successfully");
      router.push("/dashboard/reason");
    } catch (error) {
      alert("Failed to create reason");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-6 max-w-lg">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Create Report Reason</h2>

          <input
            className="w-full border p-2 rounded"
            placeholder="Reason title"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>

            <button
              onClick={() => router.back()}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
