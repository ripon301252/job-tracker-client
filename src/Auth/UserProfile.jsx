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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-gray-800">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* HEADER */}
        <div className="lg:h-32 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          {/* PROFILE PIC */}
          <div className="absolute flex items-center lg:mt-[82px] mt-[65px] lg:ml-8 ml-4 text-center">
            <div className="">
              <img
                src={formData.photoURL || user?.photoURL}
                alt="profile"
                className="lg:w-28 lg:h-28 w-20 h-20 rounded-full border-4 border-amber-500 object-cover"
              />
            </div>

            <div className="ml-2">
              {/* ALWAYS SHOW NAME */}
              <div>
                <h2 className="mt-5 font-bold flex items-center justify-start gap-2 ">
                  <FaUser className="text-blue-500" />
                  {user?.displayName}
                </h2>
              </div>

              {/* ALWAYS SHOW EMAIL */}
              <div>
                <p className="text-sm text-gray-600 flex items-center justify-start gap-2">
                  <FaEnvelope className="text-indigo-500" />
                  {user?.email}
                </p>
              </div>
            </div>
            
          </div>
        </div>

        {/* BODY */}
        <div className="pt-20 p-6">
          {/* EDIT SECTION */}
          {isEdit && (
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded input-class"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Photo URL</label>
                <input
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded input-class"
                />
              </div>
            </div>
          )}

          {/* INFO GRID (ALWAYS SHOW) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* ROLE */}
            <div className="p-4 rounded-xl bg-gray-50 border hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <FaUserTag className="text-indigo-500" /> Role
              </p>

              <div className="flex items-center justify-between">
                N/A
              </div>
            </div>

            {/* ACCOUNT STATUS */}
            <div className="p-4 rounded-xl bg-gray-50 border hover:shadow-md transition">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> Account Type
              </p>

              <p className="font-medium text-green-600 mt-1">Active User</p>
            </div>

            {/* USER ID */}
            <div className="p-4 rounded-xl bg-gray-50 border hover:shadow-md transition">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaIdBadge className="text-blue-500" /> User ID
              </p>

              <p className="font-medium break-all mt-1">{user?.uid}</p>
            </div>

            {/* LAST LOGIN */}
            <div className="p-4 rounded-xl bg-gray-50 border hover:shadow-md transition">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaCalendarAlt className="text-orange-500" /> Last Login
              </p>

              <p className="font-medium text-sm mt-1">
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
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded"
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
