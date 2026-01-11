"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios_instance from "@/config/axios";

/*  TYPES  */

type ReportStatus = "pending" | "resolved" | "dismissed";

interface Report {
  _id: string;
  reportedBy: {
    name: string;
  };
  ownerinfo?: {
    ownerName: string;
  };
  typeModel: string;
  status: ReportStatus;
  createdAt: string;
  reportReason?: string;
}
interface UpdateStatusPayload {
  id: string;
  status: ReportStatus;
}

/* COMPONENT */

export default function ReportTable() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const queryClient = useQueryClient();

  /* API  */
  const updateStatus = async ({ id, status }: UpdateStatusPayload) => {
    const { data } = await axios_instance.patch(
      `/report/dashboard/${id}`
      // { status }
    );
    return data;
  };

  /*FETCH REPORTS  */
  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery<Report[]>({
    queryKey: ["reportList"],
    queryFn: async () => {
      const { data } = await axios_instance.get(
        "/report/dashboard?page=1&limit=15"
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      return Array.isArray(data.data.reports)
        ? data.data.reports
        : [data.data.reports];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading reports...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load reports
      </div>
    );
  }

  /* UI */
   return (
    <div className="bg-gray-100 min-h-screen w-screen p-6">
      <div className="w-full space-y-4">
        {/* Header */}
        <Card>
          <CardContent className="px-2 py-1">
            <h2 className="text-base font-semibold text-gray-800"> REPORT</h2>
          </CardContent>
        </Card>

        {/* Search */}
        <Card>
          <CardContent className="px-5 py-3">
            <input
              placeholder="Search"
              className="w-full max-w-md border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="overflow-x-auto">
          <CardContent className="p-0">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Reported By</th>
                  <th className="p-3 text-left">Owner</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Reported Time </th>
                  <th className="p-3 text-left">View</th>
                </tr>
              </thead>

              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-4 text-center text-gray-500"
                    >
                      No reports found
                    </td>
                  </tr>
                ) : (
                  reports.map((r) => (
                    <tr key={r._id} className="border-t">
                      <td className="p-3">{r.reportedBy?.name}</td>
                      <td className="p-3">{r.ownerinfo?.ownerName ?? "test1"} </td>
                      <td className="p-3">{r.typeModel}</td>
                     <td
                        className="p-3 text-blue-600 cursor-pointer"
                        onClick={() => setSelectedReport(r)}
                      >
                      pending
                      </td>
                      <td className="p-3">{new Date(r.createdAt).toLocaleString()}
                      </td>
                      <td
                        className="p-3 text-blue-600 cursor-pointer"
                        onClick={() => setSelectedReport(r)}
                      >
                        View
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <>
              <div className="space-y-2 text-sm">
                <p>
                  <b>Reported By:</b>{" "}
                  {selectedReport.reportedBy?.name}
                </p>
                <p>
                  <b>Report Reason:</b>{" "}
                  {selectedReport.reportReason ?? "—"}
                </p>
                <p>
                  <b>Type:</b> {selectedReport.typeModel}
                </p>
                <p>
                  <b>Current Status:</b> {selectedReport.status}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className={`px-4 py-2 rounded border ${
                    selectedReport.status === "resolved"
                      ? "bg-green-600 text-white"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    setSelectedReport({
                      ...selectedReport,
                      status: "resolved",
                    })
                  }
                >
                  Approved
                </button>

                <button
                  className={`px-4 py-2 rounded border ${
                    selectedReport.status === "dismissed"
                      ? "bg-red-600 text-white"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    setSelectedReport({
                      ...selectedReport,
                      status: "dismissed",
                    })
                  }
                >
                  Disapproved
                </button>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setSelectedReport(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded"
                 onClick={() => setSelectedReport(null)} >
                {/* onClick={() => updateStatus(reports.id)} */}
                  Save
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
