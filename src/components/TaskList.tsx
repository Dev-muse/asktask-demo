"use client";

import { useState } from "react";

type Task = {
  _id: string;
  title: string;
  status: string;
};

interface Props {
  tasks: Task[];
}

export default function TaskTable({ tasks }: Props) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sorted = [...tasks].sort((a, b) => {
    if (sortOrder === "asc") return a.status.localeCompare(b.status);
    return b.status.localeCompare(a.status);
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="sort" className="font-semibold">Sort by status:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="select select-sm select-bordered"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <p className="text-muted">No tasks available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((task, index) => (
                <tr key={task._id} className="hover:bg-base-200">
                  <th>{index + 1}</th>
                  <td>{task.title}</td>
                  <td className="uppercase font-semibold">{task.status}</td>
                  <td className="flex gap-2">
                    <a
                      href={`/tasks/${task._id}`}
                      className="btn btn-square btn-ghost"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 3L20 12 6 21 6 3z" />
                      </svg>
                    </a>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
