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

    // ✅ Required validation
    if (
      !companyName ||
      !jobTitle ||
      !jobUrl ||
      !source ||
      !applicationDate ||
      !status
    ) {
      return toast.error("All field is required   ");
    }

    try {
      const jobData = {
        ...formData,
        userEmail: user?.email, // 🔐 ownership
      };

      await axiosAddJob.post("/applications", jobData);

      toast.success("Job Added Successfully ");
      navigate("/myApplications");
    } catch (error) {
      toast.error( error, "Failed to add job ");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-[#03373d] shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
        Add Job Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="jobUrl"
          placeholder="Job URL"
          value={formData.jobUrl}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="source"
          placeholder="Source (LinkedIn, Bdjobs...)"
          value={formData.source}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="date"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="assessment">Assessment</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <button className="btn w-full bg-green-500 text-white hover:bg-green-600">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;