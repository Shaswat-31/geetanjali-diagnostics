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
      console.error("Failed to fetch data:", response.statusText);
    }
    setLoading(false);
  };

  const totalCost = patients.reduce((acc, patient) => acc + patient.costTotal, 0);
  const testsData = patients.map((patient) => JSON.parse(patient.tests).length);
  const testsNames=patients.map((patient)=>JSON.parse(patient.tests));
  const totalTests = testsData.reduce((acc, count) => acc + count, 0);
  function getTestFrequencies(testsNames) {
    const frequencyMap = {};
  
    // Iterate through each array inside testsNames
    testsNames.forEach(testArray => {
      testArray.forEach(test => {
        // If the test already exists in frequencyMap, increment its count
        if (frequencyMap[test]) {
          frequencyMap[test]++;
        } else {
          // Otherwise, initialize the count to 1
          frequencyMap[test] = 1;
        }
      });
    });
  
    return frequencyMap;
  }

  // Get test frequencies
  const testFrequencies = getTestFrequencies(testsNames);
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
    <div className="min-h-screen p-8" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Finance</h1>

      <div className="flex flex-col md:flex-row items-center justify-center mb-8">
        <div className="mb-4 md:mb-0 md:mr-4">
          <label className="block mb-2" style={{ color: "var(--textSoft)" }}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ backgroundColor: "var(--bgSoft)", color: "var(--text)" }}
          />
        </div>

        <div className="md:mr-4">
          <label className="block mb-2" style={{ color: "var(--textSoft)" }}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ backgroundColor: "var(--bgSoft)", color: "var(--text)" }}
          />
        </div>

        <button
          onClick={fetchData}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4 md:mt-0 md:ml-4 hover:bg-indigo-700 transition duration-300"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      <div className="shadow-lg rounded-lg p-6 mb-8" style={{ backgroundColor: "var(--bgSoft)" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--textSoft)" }}>Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#cfe2ff", color: "#084298" }}>
            <p className="text-lg font-bold">Total Patients</p>
            <p className="text-2xl">{patients.length}</p>
          </div>
          <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#d1e7dd", color: "#0f5132" }}>
            <p className="text-lg font-bold">Total Tests</p>
            <p className="text-2xl">{totalTests}</p>
          </div>
          <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "#fff3cd", color: "#664d03" }}>
            <p className="text-lg font-bold">Total Cost</p>
            <p className="text-2xl">₹{totalCost}</p>
          </div>
        </div>
      </div>
      <div
  className="shadow-lg rounded-lg p-6 mb-8"
  style={{ backgroundColor: "var(--bgSoft)" }}
>
  <h2
    className="text-xl font-semibold mb-4 text-center"
    style={{ color: "var(--textSoft)" }}
  >
    Test Frequencies
  </h2>
  <ul className="space-y-2">
    {Object.entries(testFrequencies).map(([test, frequency]) => (
      <li
        key={test}
        className="flex justify-between items-center p-4 rounded-md"
        style={{
          backgroundColor: "var(--bgSoft)",
          color: "var(--textSoft)"
        }}
      >
        <span className="font-medium">{test}</span>
        <span className="text-sm">{frequency}</span>
      </li>
    ))}
  </ul>
</div>


      <div className="shadow-lg rounded-lg p-6" style={{ backgroundColor: "var(--bgSoft)" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--textSoft)" }}>Patient Financial Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: "var(--bgSoft)", color: "var(--textSoft)" }}>
                  Patient Name
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: "var(--bgSoft)", color: "var(--textSoft)" }}>
                  Tests Done
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: "var(--bgSoft)", color: "var(--textSoft)" }}>
                  Total Cost
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: "var(--bgSoft)", color: "var(--textSoft)" }}>
                  Doctor Referred
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {JSON.parse(patient.tests).map((test, i) => (
                      <div key={i}>{test}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">₹{patient.costTotal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.doctorReferred}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="shadow-lg rounded-lg p-6 mt-8" style={{ backgroundColor: "var(--bgSoft)" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--textSoft)" }}>Cost vs Tests Chart</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default FinancePage;
