import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddJob = () => {
  const axiosAddJob = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobUrl: "",
    source: "",
    applicationDate: "",
    status: "applied",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      companyName,
      jobTitle,
      jobUrl,
      source,
      applicationDate,
      status,
    } = formData;

    if (!companyName || !jobTitle || !jobUrl || !source || !applicationDate || !status) {
      return toast.error("All fields are required");
    }

    try {
      const jobData = {
        ...formData,
        userEmail: user?.email,
      };

      await axiosAddJob.post("/applications", jobData);

      toast.success("Job Added Successfully ");
      navigate("/myApplications");
    } catch (error) {
      toast.error("Failed to add job", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl p-8 rounded-2xl
      backdrop-blur-xl bg-white/5 border border-white/10
      shadow-2xl text-white">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6
        bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Add Job Application
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Company */}
          <input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="inputGlass"
          />

          {/* Job Title */}
          <input
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="inputGlass"
          />

          {/* URL */}
          <input
            name="jobUrl"
            placeholder="Job URL"
            value={formData.jobUrl}
            onChange={handleChange}
            className="inputGlass md:col-span-2"
          />

          {/* Source */}
          <input
            name="source"
            placeholder="Source (LinkedIn, Bdjobs...)"
            value={formData.source}
            onChange={handleChange}
            className="inputGlass"
          />

          {/* Date */}
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            className="inputGlass"
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="inputGlass md:col-span-2"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
            <option value="recent-jobs">Recent Jobs</option>
          </select>

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            className="inputGlass md:col-span-2 h-24 resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 py-3 rounded-lg font-semibold
            bg-gradient-to-r from-green-400 to-blue-500
            hover:scale-105 active:scale-95 transition shadow-lg"
          >
            Add Job 
          </button>
        </form>
      </div>

      {/* 🔥 Reusable Glass Input Style */}
      <style>
        {`
        .inputGlass {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          outline: none;
          color: white;
          transition: 0.3s;
        }

        .inputGlass::placeholder {
          color: rgba(255,255,255,0.6);
        }

        .inputGlass:focus {
          border: 1px solid rgba(34,197,94,0.7);
          box-shadow: 0 0 10px rgba(34,197,94,0.3);
        }
        `}
      </style>
    </div>
  );
};

export default AddJob;