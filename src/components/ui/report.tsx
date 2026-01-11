"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import axios_instance from "@/config/axios";

interface Report {
   id: number;
  name: string;
  reportedBy: string;
  owner: string;
  type: string;
  reportedTime: string;
  reportReason: string;
  status: string;
}


export default function ReportTable() {
    const [report, setReport] = useState<Report[]>([]);

  // Fetch users
  const { data: reports, isLoading } = useQuery({
    queryKey: ["reportList"],
    queryFn: async () => {
      const { data } = await axios_instance.get("/report/dashboard/");
        if (!data.success)
          throw new Error(data.message || "Failed to fetch posts");
        console.log(data.data)
         setReport(data.data)
        return data.data;
    },
  });
  const fetchUsers = async () => {
    
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

return (
    <div className="bg-gray-100 min-h-screen w-screen p-6">
      <div className="w-full space-y-4">
      <Card>
          <CardContent className="px-2 py-1">
            <h2 className="text-base font-semibold text-gray-800">REPORTS</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-5 py-3">
            <input
              placeholder="Search"
              className="w-full max-w-md border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </CardContent>
        </Card>

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
                    selectedReport.status === "Approved"
                      ? "bg-green-600 text-white"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    setSelectedReport({
                      ...selectedReport,
                      status: "Approved",
                    })
                  }
                >
                  Approved
                </button>

                <button
                  className={`px-4 py-2 rounded border ${
                    selectedReport.status === "Disapproved"
                      ? "bg-red-600 text-white"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    setSelectedReport({
                      ...selectedReport,
                      status: "Disapproved",
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
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
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
