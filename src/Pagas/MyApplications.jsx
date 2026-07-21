import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyApplications = () => {
  const axiosMyApplications = useAxiosSecure();
  const [jobs, setJobs] = useState([]);

  // ✅ Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosMyApplications.get("/applications");
        setJobs(res.data);
      } catch (err) {
        toast.error("Failed to load jobs ❌");
      }
    };

    fetchJobs();
  }, [axiosMyApplications]);

  // ✅ Delete Job
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axiosMyApplications.delete(`/applications/${id}`);
      toast.success("Deleted Successfully ✅");

      // UI update
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-3">
      <h2 className="text-2xl font-bold mb-5">My Applications</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs added yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th>Company</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.companyName}</td>
                  <td>{job.jobTitle}</td>

                  {/* Status Badge */}
                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-green-200 text-green-800">
                      {job.status}
                    </span>
                  </td>

                  <td>
                    {new Date(job.applicationDate).toLocaleDateString()}
                  </td>

                  <td>{job.source}</td>

                  <td className="flex gap-2">
                    {/* 🔗 View Job */}
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-xs bg-blue-500 text-white"
                    >
                      View
                    </a>

                    {/* 🗑 Delete */}
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="btn btn-xs bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;