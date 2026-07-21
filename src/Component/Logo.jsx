import React from "react";
import { Link } from "react-router";
import { SiPivotaltracker } from "react-icons/si";

const Logo = () => {
  return (
    <div>
      <Link to={`/`} className="flex items-center gap-1">
        <div>
          <SiPivotaltracker className="text-2xl text-sky-500/80 animate-spin [animation-duration:4s]" />
        </div>
        <div>
          <span className="text-xl font-bold text-white ">JOB</span>
          <span className="text-xl font-bold text-sky-500/80">TRACKER</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
