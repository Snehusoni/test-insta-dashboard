"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios_instance from "@/config/axios";

interface Reason {
  _id: string;
  name: string;
  createdAt: string;
}

export default function ReasonListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reason-list"],
    queryFn: async () => {
      const res = await axios_instance.get("/reasons");
      console.log(res)
      return res.data.data.findAllReason as Reason[];
    },
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load reasons</div>;

  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Report Reason List</h2>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">#</th>
                <th className="border p-2 text-left">Reason</th>
                <th className="border p-2 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(data) &&
               data.map((item, index) => (
               <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                      {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString() : "-"}
                   </td>
               </tr>
                 ))}
            </tbody>

          </table>
        </CardContent>
      </Card>
    </div>
  );
}
