import React, { useEffect, useState } from "react";
import { fetchMyApplications } from "../../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetchMyApplications(user.id);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load applications.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-4 rounded shadow">
            <p><strong>Job ID:</strong> {app.jobId}</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;
