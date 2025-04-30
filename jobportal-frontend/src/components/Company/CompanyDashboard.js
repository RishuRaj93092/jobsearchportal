import React, { useEffect, useState } from "react";
import { fetchCompanyJobs, fetchApplicationsByJob, updateApplicationStatus } from "../../services/api";

function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetchCompanyJobs(user.id);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadApplications = async (jobId) => {
    setSelectedJobId(jobId);
    try {
      const res = await fetchApplicationsByJob(jobId);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      loadApplications(selectedJobId); // reload after update
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Company Dashboard</h2>

      <h3 className="text-xl font-semibold mb-4">Your Posted Jobs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded shadow">
            <h4 className="text-lg font-bold">{job.title}</h4>
            <p>Location: {job.location}</p>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              onClick={() => loadApplications(job.id)}
            >
              View Applicants
            </button>
          </div>
        ))}
      </div>

      {selectedJobId && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Applicants for Job ID {selectedJobId}</h3>
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 mb-4 rounded shadow flex justify-between">
              <div>
                <p><strong>Applicant ID:</strong> {app.applicantId}</p>
                <p><strong>Status:</strong> {app.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={() => handleStatusChange(app.id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleStatusChange(app.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyDashboard;
