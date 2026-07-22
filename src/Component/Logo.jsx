import React from "react";
import { Link } from "react-router";
import { SiPivotaltracker } from "react-icons/si";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2 group">

        {/* Icon */}
        <SiPivotaltracker
          className="text-2xl text-sky-400 animate-spin 
          [animation-duration:5s]"
        />

        {/* Text with BG-CLIP */}
        <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
          JOB TRACKER
        </h1>

      </Link>
    </div>
  );
};

export default Logo;