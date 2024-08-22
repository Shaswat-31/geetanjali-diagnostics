// components/DateRangeForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DateRangeForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/dashboard/patients?startDate=${startDate}&endDate=${endDate}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-4 p-2 border rounded bg-slate-600 shadow-md"
    >
      <label className="flex items-center text-black">
        <span className="mr-2">Start Date:</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex items-center text-black">
        <span className="mr-2">End Date:</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Filter
      </button>
    </form>
  );
};

export default DateRangeForm;
