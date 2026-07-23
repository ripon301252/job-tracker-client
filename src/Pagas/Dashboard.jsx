import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Card from "./Card";

const Dashboard = () => {
  const axiosDashboard = useAxiosSecure();

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadData = async () => {
      
      try {
        const res = await axiosDashboard.get("/api/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    loadData();
  }, [axiosDashboard]);

  return (
    <div className="py-6 max-w-6xl mx-auto px-2">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        // Loader UI
        // <div className="flex justify-center items-center py-20">
        //   <span className="loading loading-bars loading-xl"></span>
        // </div>
        // =======================
        <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-white/10 animate-pulse rounded"
              ></div>
            ))}
          </div>
      ) : (
        //  Actual Content
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card title="Total" value={stats.total} />
          <Card title="Applied" value={stats.applied} />
          <Card title="Interview" value={stats.interview} />
          <Card title="Rejected" value={stats.rejected} />
          <Card title="Offer" value={stats.offer} />
          <Card title="Recent Jobs" value={stats.recent_jobs} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;