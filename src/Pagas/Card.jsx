import { FaBriefcase } from "react-icons/fa";

const Card = ({ title, value, icon }) => {
  return (
    <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/50 to-blue-500/50 hover:scale-105 transition duration-300 ">

      {/* GLASS BODY */}
      <div className="flex items-center justify-between p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 text-white shadow-xl">

        {/* TEXT */}
        <div>
          <h2 className="text-sm text-gray-300">{title}</h2>
          <p className="text-3xl font-bold mt-1">
            {value ?? 0}
          </p>
        </div>

        {/* ICON */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-cyan-300 text-2xl group-hover:rotate-12 transition">
          {icon || <FaBriefcase />}
        </div>
      </div>
    </div>
  );
};

export default Card;