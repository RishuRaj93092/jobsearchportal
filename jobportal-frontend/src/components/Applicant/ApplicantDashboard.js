import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../services/api";
import { applyJob } from "../../services/api";

function ApplicantDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await fetchJobs();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs");
    }
  };

//   const applyJob = (jobId) => {
//     alert(`Applied for Job ID: ${jobId} (Apply logic later)`);
//     //Implement applyJobClick
//   };

  const applyJobClick = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await applyJob({ applicantId: user.id, jobId: jobId });
      console.log(res.data);
      alert("Application Submitted Successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to Apply.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-2">{job.title}</h3>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <button
              className="mt-4 bg-green-500 text-white p-2 rounded w-full"
              onClick={() => applyJobClick(job.id)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicantDashboard;
