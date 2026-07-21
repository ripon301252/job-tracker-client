import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import {
  FaUser,
  FaUserTag,
  FaEnvelope,
  FaCheckCircle,
  FaIdBadge,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      setIsEdit(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 text-white">

      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600 relative">

          {/* PROFILE PIC */}
          <div className="absolute -bottom-12 left-6 flex items-center gap-4">
            <img
              src={formData.photoURL || user?.photoURL}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg hover:scale-105 transition"
            />

            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FaUser className="text-white" />
                {user?.displayName}
              </h2>

              <p className="text-sm text-gray-200 flex items-center gap-2">
                <FaEnvelope />
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="pt-16 p-6">

          {/* EDIT FORM */}
          {isEdit && (
            <div className="space-y-3 mb-5">

              <input
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300"
              />

              <input
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Photo URL"
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300"
              />
            </div>
          )}

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="p-4 rounded-xl bg-white/10 border border-white/20 hover:scale-[1.02] transition">
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <FaUserTag /> Role
              </p>
              <p className="mt-1 font-medium">N/A</p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/20 hover:scale-[1.02] transition">
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <FaCheckCircle /> Account
              </p>
              <p className="mt-1 text-green-400 font-medium">Active User</p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/20 hover:scale-[1.02] transition">
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <FaIdBadge /> User ID
              </p>
              <p className="mt-1 text-sm break-all">{user?.uid}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/20 hover:scale-[1.02] transition">
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <FaCalendarAlt /> Last Login
              </p>
              <p className="mt-1 text-sm">
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleString()
                  : "N/A"}
              </p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-3">
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition"
                >
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;