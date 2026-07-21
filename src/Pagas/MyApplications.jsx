import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyApplications = () => {
  const axiosMyApplications = useAxiosSecure();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosMyApplications.get("/applications");
        setJobs(res.data);
      } catch {
        toast.error("Failed to load jobs ❌");
      }
    };
    fetchJobs();
  }, [axiosMyApplications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axiosMyApplications.patch(`/applications/${id}`, editData);

      toast.success("Updated Successfully ✅");

      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, ...res.data } : job
        )
      );

      document.getElementById("my_modal_5").close();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axiosMyApplications.delete(`/applications/${id}`);
      toast.success("Deleted Successfully ✅");

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-500/20 text-blue-300";
      case "interview":
        return "bg-yellow-500/20 text-yellow-300";
      case "rejected":
        return "bg-red-500/20 text-red-300";
      case "offer":
        return "bg-green-500/20 text-green-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="min-h-screen py-10 px-3">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 text-white">

        <h2 className="text-3xl font-bold mb-6 text-center">
          My Applications 
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-300 text-center">No jobs added yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-white">
              <thead>
                <tr className="bg-white/10 text-white">
                  <th>No.</th>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Source</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job, index) => (
                  <tr key={job._id} className="hover:bg-white/10 transition">
                    <td>{index + 1}</td>
                    <td>{job.companyName}</td>
                    <td>{job.jobTitle}</td>

                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(job.status)}`}>
                        {job.status}
                      </span>
                    </td>

                    <td>
                      {new Date(job.applicationDate).toLocaleDateString()}
                    </td>

                    <td>{job.source}</td>

                    <td className="flex gap-2">
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white border-none"
                      >
                        View
                      </a>

                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setEditData(job);
                          document.getElementById("my_modal_5").showModal();
                        }}
                        className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white border-none"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-xs bg-red-500 hover:bg-red-600 text-white border-none"
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

      {/* MODAL */}
      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box backdrop-blur-xl bg-white/10 border border-white/20 text-white">

          <h3 className="font-bold text-lg mb-4">
            ✏️ Edit Application
          </h3>

          {selectedJob && (
            <div className="space-y-3">

              <input
                type="text"
                name="companyName"
                value={editData.companyName || ""}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/10 text-white"
                placeholder="Company Name"
              />

              <input
                type="text"
                name="jobTitle"
                value={editData.jobTitle || ""}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/10 text-white"
                placeholder="Job Title"
              />

              <select
                name="status"
                value={editData.status || ""}
                onChange={handleChange}
                className="select select-bordered w-full bg-white/10 text-white"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>

              <div className="modal-action">
                <button
                  onClick={() => handleUpdate(selectedJob._id)}
                  className="btn bg-green-500 hover:bg-green-600 text-white border-none"
                >
                  Save
                </button>

                <form method="dialog">
                  <button className="btn bg-gray-500 text-white border-none">
                    Cancel
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;