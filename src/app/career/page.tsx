"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const job = {
    id: 1,
    title: "Associate, Product and Data",
    location: "Delhi, Delhi, India",
    date: "10/30/2024",
    short:
      "At Newslaundry, we take pride in delivering a news product that readers find value in and pay for. Our community of subscribers from across the world…",
    type: "Full time",
  };

  return (
    <div className="bg-muted min-h-svh p-6 items-center md:p-20 flex justify-center">
      <div className="w-full max-w-5xl">
        <Card className="rounded-1xl shadow-xs border border-gray-100 overflow-hidden w-full">
          <CardContent className="p-1 md:p-2">
            <div className="w-full flex justify-center mt-30">
              <h2 className="text-3xl font-bold text-gray-900 text-center pb-2 -mt-20">
                Current Openings
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 mt-6 w-full">
              <div className="flex-shrink-0 w-70">
                <h2 className="text-gray-600 text-md mb-3 font-medium">
                  Filters
                </h2>

                <div className="border rounded-lg p-5 bg-white shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Job Type
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-gray-900"
                      />
                      <span className="text-gray-700">Full time (1)</span>
                    </label>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Team
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-gray-900"
                      />
                      <span className="text-gray-700">
                        Product & Revenue (1)
                      </span>
                    </label>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Experience
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-gray-900"
                      />
                      <span className="text-gray-700">0–1 year (1)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-gray-900"
                      />
                      <span className="text-gray-700">3–5 year (1)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">What</label>
                  <input
                    type="text"
                    placeholder="Job title or skill"
                    className="w-64 mt-1 border rounded-md px-3 py-2 bg-white shadow-sm focus:ring-1 focus:ring-gray-400 outline-none"
                  />
                </div>

                <div className="w-full">
                  <label className="text-gray-600 font-medium">Where</label>
                  <input
                    type="text"
                    placeholder="City, State or Country"
                    className="w-64 mt-1 border rounded-md px-3 py-2 bg-white shadow-sm focus:ring-1 focus:ring-gray-400 outline-none"
                  />
                </div>

                <button className="h-10 px-6 md:mt-7 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-22 -mt-55 w-full justify-center ml-85">
              <div className="flex-1">
                <div
                  className="p-8 rounded-lg border bg-white shadow hover:shadow-md transition w-160 cursor-pointer"
                  onClick={() => router.push(`/career/${job.id}`)}
                >
                  <h3 className="text-xl font-semibold text-gray-900 hover:underline cursor-pointer">
                    {job.title}
                  </h3>

                  <p className="text-gray-600 mt-1">{job.location}</p>

                  <p className="text-gray-700 mt-4 leading-relaxed">
                    {job.short}
                  </p>

                  <p className="text-gray-500 text-sm mt-4">
                    {job.type} • {job.date}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => router.push("/career/all-jobs")}
                className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
              >
                View More Jobs
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
