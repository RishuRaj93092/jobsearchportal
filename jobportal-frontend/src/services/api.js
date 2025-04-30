// src/services/api.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8888/api",
  withCredentials: true, // <-- Add this if your backend uses session cookies
});

// Auth APIs
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// Job APIs
export const fetchJobs = () => API.get("/jobs/all");
export const createJob = (jobData) => API.post("/jobs/create", jobData);

// Application APIs
export const applyJob = (applicationData) => API.post("/applications/apply", applicationData);
export const fetchMyApplications = (applicantId) => API.get(`/applications/my-applications/${applicantId}`);

export const fetchCompanyJobs = (companyId) => API.get(`/jobs/company/${companyId}`);
export const fetchApplicationsByJob = (jobId) => API.get(`/applications/by-job/${jobId}`);
export const updateApplicationStatus = (applicationId, status) => API.put(`/applications/update-status/${applicationId}?status=${status}`);

export default API;

