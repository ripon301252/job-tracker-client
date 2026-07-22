import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        swipeable
        showIndicators={true}
      >
        {[b1, b2, b3].map((img, i) => (
          <div key={i} className="relative">
            {/* 🖼 Image */}
            <img
              src={img}
              alt="banner"
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />

            {/* 🔥 Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90"></div>

            {/* 💎 Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div
                className="backdrop-blur-xl bg-white/5 border border-white/10 
              rounded-2xl p-6 md:p-10 text-center text-white max-w-3xl"
              >
                {/* 🔥 Heading */}
                <h1
                  className="text-2xl md:text-5xl font-extrabold mb-3 
                bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 
                bg-clip-text text-transparent"
                >
                  Track Your Job Applications Easily
                </h1>

                {/* ✨ Sub text */}
                <p className="text-gray-300 text-sm md:text-lg mb-8">
                  Stay organized, monitor your job applications, and land your
                  dream job faster.
                </p>

                {/* ⚡ Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/myApplications"
                    className="px-6 py-3 rounded-lg font-semibold 
                    bg-gradient-to-r from-green-400 to-blue-500
                    hover:scale-105 active:scale-95 transition shadow-lg"
                  >
                    View Applications
                  </Link>

                  <Link to="/addJob"
                    className="px-6 py-3 rounded-lg font-semibold 
                    bg-white/10 hover:bg-white/20 border border-white/10 transition"
                  >
                    Add New Job
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
