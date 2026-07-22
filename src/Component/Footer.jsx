import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin, CiYoutube } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className=" backdrop-blur-xl bg-gradient-to-r from-sky-800/50 via-sky-900/50 to-sky-800/50 border-t border-white/10 text-white">
      
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* 🔹 Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Logo + About */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-gray-300 max-w-sm">
              Track your job applications, monitor progress, and stay organized.
              Your smart companion to land your dream job faster.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">

            <div>
              <h3 className="font-semibold mb-3 text-white">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Add Job</a></li>
                <li><a href="#">Applications</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-white">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-white">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* 🔹 Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* 🔹 Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Job Tracker. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5">

            <a
              href="https://www.linkedin.com/in/mahfuzur-rahman-280471392/"
              target="_blank"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <CiLinkedin className="text-2xl text-blue-400" />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaXTwitter className="text-2xl" />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100089627922381"
              target="_blank"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaFacebookF className="text-xl text-blue-500" />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <CiYoutube className="text-2xl text-red-500" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;