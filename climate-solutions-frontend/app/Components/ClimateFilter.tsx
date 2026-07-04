"use client";

import { useState } from "react";

export default function ClimateFilter() {
  const [risk, setRisk] = useState("Drought");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/solutions?risk=${risk}`
      );

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log("Error fetching data", err);
    }

    setLoading(false);
  };

 return (
  <div className="min-h-screen bg-gray-50 p-10">
    <h1 className="text-3xl font-bold mb-6">
      Climate Adaptation Solutions
    </h1>

    <div className="flex gap-3 mb-6">
      <select
        value={risk}
        onChange={(e) => setRisk(e.target.value)}
        className="border px-3 py-2 rounded-md"
      >
        <option value="Drought">Drought</option>
        <option value="Flood">Flood</option>
        <option value="Heatwave">Heatwave</option>
      </select>

      <button
        onClick={fetchData}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </div>

    {loading && <p className="text-gray-500">Loading...</p>}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            {item.name}
          </h3>

          <p className="text-sm text-gray-600">
            <b>Risk:</b> {item.risk}
          </p>

          <p className="text-sm text-gray-600">
            <b>Sector:</b> {item.sector}
          </p>

          <p className="text-sm text-gray-600">
            <b>Cost:</b> {item.cost}
          </p>
        </div>
      ))}
    </div>
  </div>
);
}