import React from "react";
import { Link } from "react-router-dom";
import { SiCoffeescript } from "react-icons/si";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#ceb5a7] to-[#eacdbd] text-gray-800 py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Logo & Deskripsi */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <SiCoffeescript className="text-3xl" />
            <h1 className="text-2xl font-bold">CoffeTime</h1>
          </div>
          <p className="text-sm text-gray-700 max-w-xs">
            Nikmati secangkir kopi terbaik kami yang diracik dengan cinta dan
            semangat setiap hari.
          </p>
        </div>

        {/* Navigasi */}
        <div className="flex flex-col text-center md:text-left">
          <h2 className="font-semibold text-lg mb-2">Navigasi</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-[#b09281] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-[#b09281] transition">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#b09281] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#b09281] transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/profil" className="hover:text-[#b09281] transition">
                Profil
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak & Sosial Media */}
        <div className="text-center md:text-left">
          <h2 className="font-semibold text-lg mb-2">Hubungi Kami</h2>
          <p className="text-sm">Jl. Aroma Kopi No. 27, Isekai</p>
          <p className="text-sm">coffetime@kopi.id</p>
          <div className="flex justify-center md:justify-start gap-4 mt-3">
            <a href="#" className="hover:text-[#b09281] text-xl transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#b09281] text-xl transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-[#b09281] text-xl transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-400 mt-10 pt-4 text-center text-sm text-gray-700">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">CoffeTime</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
