"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: number;
  title: string;
  type: string;
  location: string;
  posted: string;
  short: string;
};

export default function AllJobsPage() {
  const router = useRouter();

  const jobs: Job[] = [
    {
      id: 1,
      title: "Associate, Product and Data",
      type: "Full-time",
      location: "Delhi, India",
      posted: "10/30/2024",
      short: "Deliver news products that readers value.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      type: "Full-time",
      location: "Pune, India",
      posted: "01/05/2025",
      short: "Build web apps using React & TypeScript.",
    },
    {
      id: 3,
      title: "Backend Developer",
      type: "Full-time",
      location: "Mumbai, India",
      posted: "02/01/2025",
      short: "Work on Node.js and database management.",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      type: "Full-time",
      location: "Remote",
      posted: "02/10/2025",
      short: "Maintain CI/CD pipelines and cloud infrastructure.",
    },
    {
      id: 5,
      title: "Machine Learning Intern",
      type: "Internship",
      location: "Mumbai, India",
      posted: "03/02/2025",
      short: "Work on ML models and data preprocessing.",
    },
    {
      id: 6,
      title: "HR Recruiter",
      type: "Full-time",
      location: "Pune, India",
      posted: "01/20/2025",
      short: "Handle hiring process and candidate screening.",
    },
    {
      id: 7,
      title: "Social Media Manager",
      type: "Part-time",
      location: "Delhi, India",
      posted: "02/11/2025",
      short: "Plan content & manage posting schedules.",
    },
  ];

  return (
    <div className="bg-muted min-h-screen p-6 md:p-20 flex flex-col items-center">
      <div className="w-full max-w-5xl mb-6">
        <button
          onClick={() => router.push("/career")}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
        >
          Back to Career Page
        </button>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-lg border bg-white shadow hover:shadow-md cursor-pointer transition"
            onClick={() => router.push(`/career/${job.id}`)}
          >
            <h3 className="text-xl font-semibold text-gray-900 hover:underline">
              {job.title}
            </h3>
            <p className="text-gray-600 mt-1">{job.location}</p>
            <p className="text-gray-700 mt-2">{job.short}</p>
            <p className="text-gray-500 text-sm mt-2">
              {job.type} • {job.posted}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
