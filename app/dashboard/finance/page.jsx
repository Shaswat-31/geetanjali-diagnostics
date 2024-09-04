"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const FinancePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`/api/finance?startDate=${startDate}&endDate=${endDate}`);
    if (response.ok) {
      const result = await response.json();
      setPatients(result);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
    setLoading(false);
  };

  const totalCost = patients.reduce((acc, patient) => acc + patient.costTotal, 0);
  const testsData = patients.map((patient) => JSON.parse(patient.tests).length);
  const totalTests = testsData.reduce((acc, count) => acc + count, 0);

  const chartData = {
    labels: patients.map((patient) => patient.name),
    datasets: [
      {
        label: "Cost",
        data: patients.map((patient) => patient.costTotal),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Number of Tests",
        data: testsData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Finance Dashboard</h1>

      <div className="flex flex-col md:flex-row items-center justify-center mb-8">
        <div className="mb-4 md:mb-0 md:mr-4">
          <label className="block mb-2 text-gray-600">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:mr-4">
          <label className="block mb-2 text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={fetchData}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4 md:mt-0 md:ml-4 hover:bg-indigo-700 transition duration-300"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-100 rounded-lg text-center">
            <p className="text-lg font-bold">Total Patients</p>
            <p className="text-2xl">{patients.length}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center">
            <p className="text-lg font-bold">Total Tests</p>
            <p className="text-2xl">{totalTests}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg text-center">
            <p className="text-lg font-bold">Total Cost</p>
            <p className="text-2xl">₹{totalCost}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Patient Financial Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tests Done
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor Referred
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {JSON.parse(patient.tests).map((test, i) => (
                    <div key={i}>{test}</div>
                  ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{patient.costTotal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.doctorReferred}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Cost vs Tests Chart</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default FinancePage;
