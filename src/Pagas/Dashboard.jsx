// Dashboard.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Card from "./Card";

const Dashboard = () => {
  const axiosDashboard = useAxiosSecure();  
  const [stats, setStats] = useState({});

   useEffect(() => {
    const loadData = async () => {
      const res = await axiosDashboard.get("/dashboard/stats");
      setStats(res.data);
    };

    loadData();
  }, [axiosDashboard]);

  return (
    <div className="py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card title="Total" value={stats.total} />
        <Card title="Applied" value={stats.applied} />
        <Card title="Interview" value={stats.interview} />
        <Card title="Rejected" value={stats.rejected} />
        <Card title="Offer" value={stats.offer} />
        <Card title="recent-jobs" value={stats.recent_jobs} />
      </div>
    </div>
  );
};

export default Dashboard;