import React from "react";
// import logoImg from "../assets/logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-accent-content py-20 text-white">
      <div className="lg:ml-0 mx-5">
        <div className="flex lg:justify-center relative ml-3">
          
        <Logo />
        </div>
        <p className="lg:text-center pt-5">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>

        <ul className="flex lg:flex-row flex-col lg:justify-center lg:gap-6 gap-3 py-10">
          <li>
            <a href="">Service</a>
          </li>
          <li>
            <a href="">Coverage</a>
          </li>
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">Pricing</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>

        <ul className="flex lg:justify-center gap-6">
          <li className="backdrop-blur-lg bg-white/10 p-3 rounded-full animate-pulse">
            <a className="text-[#3074a6] text-3xl" href="https://www.linkedin.com/" target="_blank">
              <CiLinkedin />
            </a>
          </li>
          <li className="backdrop-blur-lg bg-white/10 p-3 rounded-full animate-pulse">
            <a className="text-black text-3xl" href="https://x.com/" target="_blank">
              <FaXTwitter />
            </a>
          </li>
          <li className="backdrop-blur-lg bg-white/10 p-3 rounded-full animate-pulse">
            <a className="text-[#1a8ae4] text-3xl" href="https://www.facebook.com/groups/1001798088430659/members" target="_blank">
              <FaFacebookF />
            </a>
          </li>
          <li className="backdrop-blur-lg bg-white/10 p-3 rounded-full animate-pulse">
            <a className="text-[#ff0000] text-3xl" href="https://www.youtube.com/" target="_blank">
              <CiYoutube />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
