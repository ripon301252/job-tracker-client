import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

const MyApplications = () => {
  const axiosMyApplications = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editData, setEditData] = useState({});
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 5;

  // pagination logic
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const visiblePages = 5;
  const group = Math.floor((currentPage - 1) / visiblePages);
  const start = group * visiblePages + 1;
  const end = Math.min(start + visiblePages - 1, totalPages);

  // api call (search + filter)
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // ✅ start loading before API

      try {
        const res = await axiosMyApplications.get("/api/applications", {
          params: { status, search },
        });

        setJobs(
          Array.isArray(res.data) ? res.data : res.data.applications || [],
        );
        setCurrentPage(1);
      } catch (error) {
        // error handling same thakbe
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    fetchJobs();
  }, [axiosMyApplications, status, search]);

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "applied", value: "applied" },
    { label: "interview", value: "interview" },
    { label: "rejected", value: "rejected" },
    { label: "offer", value: "offer" },
    { label: "recent-jobs", value: "recent-jobs" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axiosMyApplications.patch(
        `/api/applications/${id}`,
        editData,
      );

      toast.success("Updated Successfully ");

      setJobs((prev) =>
        prev.map((job) => (job._id === id ? { ...job, ...res.data } : job)),
      );

      document.getElementById("my_modal_5").close();
    } catch {
      toast.error("Update failed ");
    }
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure?")) return;

  //   try {
  //     await axiosMyApplications.delete(`/applications/${id}`);
  //     toast.success("Deleted Successfully ");

  //     setJobs((prev) => prev.filter((job) => job._id !== id));
  //   } catch {
  //     toast.error("Delete failed ");
  //   }
  // };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosMyApplications.delete(`/api/applications/${id}`);

      Swal.fire({
        title: "Deleted!",
        text: "Your application has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Delete failed ",
        icon: "error",
      });
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
        return "bg-emerald-500/20 text-emerald-300";
      case "recent-jobs":
        return "bg-green-500/20 text-green-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  // Export PDF
  const handlePDF = () => {
    const doc = new jsPDF();

    doc.text("Job Application Tracker Report", 14, 10);

    const tableColumn = [
      "Company",
      "Job Title",
      "Status",
      "Source",
      "Created",
      "Updated",
    ];

    const tableRows = jobs.map((job) => [
      job.companyName,
      job.jobTitle,
      job.status,
      job.source,
      new Date(job.createdAt).toLocaleDateString(),
      new Date(job.updatedAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("job-tracker.pdf");
  };


  return (
    <div className="min-h-screen py-10 px-3">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">
            My Applications
          </h2>

          {/* Job Count Badge */}
          <div className="relative">
            {/* glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl rounded-full"></div>

            <p
              className="relative px-5 py-2 rounded-full text-sm font-semibold
      bg-white/10 backdrop-blur-lg border border-white/20
      text-white shadow-lg flex items-center gap-2"
            >
              <span className="text-gray-300">Applied Jobs</span>

              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold shadow">
                {jobs.length}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* 🔍 Search (BIGGER) */}
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full py-2 bg-white/5 flex-[5]"
          />

          {/* 🔽 Filter (SMALLER) */}
          <select
            className="select select-bordered w-full py-2 bg-white/90 text-black flex-[2]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* 📄 PDF Button */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-green-500/20 blur-xl "></div>

            <button
              onClick={handlePDF}
              className="relative py-2 rounded-sm font-semibold text-white
      bg-gradient-to-r from-green-500/50 to-emerald-500 w-full cursor-pointer
      hover:scale-105 active:scale-95 transition shadow-lg flex items-center justify-center gap-2"
            >
              <HiOutlineDocumentArrowDown className="text-xl" />
              Export PDF
            </button>
          </div>
        </div>

        {loading ? (
          // <div className="flex justify-center items-center py-20">
          //   <span className="loading loading-bars loading-xl"></span>
          // </div>
          // ============================
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-white/10 animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
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
                {currentJobs.map((job, index) => (
                  <tr key={job._id} className="hover:bg-white/10 transition">
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{job.companyName}</td>
                    <td>{job.jobTitle}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td>
                      {new Date(job.applicationDate).toLocaleDateString()}
                    </td>

                    <td>{job.source}</td>

                    <td className="flex gap-2">
                      {/* View */}
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-xs bg-blue-300 text-blue-800 border-none flex items-center gap-1 shadow hover:shadow-lg transition-all duration-200"
                      >
                        <FaExternalLinkAlt size={12} />
                        View
                      </a>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setEditData(job);
                          document.getElementById("my_modal_5").showModal();
                        }}
                        className="btn btn-xs bg-yellow-300 text-yellow-800 border-none flex items-center gap-1 shadow hover:shadow-lg transition-all duration-200"
                      >
                        <FaEdit size={12} />
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-xs bg-red-300 text-red-800 border-none flex items-center gap-1 shadow hover:shadow-lg transition-all duration-200"
                      >
                        <IoTrashOutline size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* pagination */}
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-sm bg-white/20 text-white disabled:opacity-30 border-none"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(end - start + 1)].map((_, i) => {
            const page = start + i;

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm rounded-full transition-all duration-200 border-none
          ${
            currentPage === page
              ? "bg-blue-500 text-white scale-110 shadow-lg"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn btn-sm bg-white/20 text-white disabled:opacity-30 border-none"
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box backdrop-blur-xl bg-white/10 border border-white/20 text-white">
          <h3 className="font-bold text-lg mb-4">Edit Application</h3>

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
                className="select select-bordered w-full bg-white text-black"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
                <option value="recent-jobs">Recent jobs</option>
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
