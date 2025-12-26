import { Card, CardContent } from "@/components/ui/card"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", users: 0 },
  { month: "Feb", users: 0 },
  { month: "Mar", users: 0 },
  { month: "Apr", users: 0 },
  { month: "May", users: 0 },
  { month: "Jun", users: 0 },
  { month: "Jul", users: 0 },
  { month: "Aug", users: 0 },
  { month: "Sep", users: 0 },
  { month: "Oct", users: 0 },
  { month: "Nov", users: 5 },
  { month: "Dec", users: 21 },
];

const stats = {
  users: 21,
  unvalidatedUsers: 19,
  posts: 7,
};


export default function usercountGraph() {
  return (
        <div className="space-y-6">

    <Card>
  <CardContent className="p-4 space-y-6">
      <h3 className="text-sm font-semibold mb-3">Users </h3>
      
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }}
           />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
</CardContent>
    </Card>
        {/* 🔹 Boxes after graph */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className=" min-h-[140px] relative">
          <p className="text-sm font-bold text-gray-700 p-1">Users</p>
          <p className="text-2xl font-semibold text-center mt-6 ">{stats.users}</p>
        </CardContent>
</Card>
         <Card>
            <CardContent className=" min-h-[140px] relative">
          <p className="text-sm font-bold text-gray-700 p-1">Unvalidated Users</p>
          <p className="text-2xl font-semibold text-center mt-6">{stats.unvalidatedUsers}</p>
 </CardContent>
    </Card>
        <Card>
            <CardContent className=" min-h-[140px] relative">
          <p className="text-sm font-bold text-gray-700 p-1">Posts</p>
          <p className="text-2xl font-semibold text-center mt-6">{stats.posts}</p>
           </CardContent>
    </Card>
        </div>
         </div>

  );
}
