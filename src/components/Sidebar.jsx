import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaBars,
  FaTimes,
  FaClosedCaptioning,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FiCoffee } from "react-icons/fi";
import { MdExitToApp, MdMenu, MdMenuBook, MdMenuOpen } from "react-icons/md";
import { SiCoffeescript } from "react-icons/si";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button - Only on Mobile */}
      <button
        className="md:hidden p-4 text-black fixed top-4 left-4 z-50 rounded"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-screen fixed top-0 left-0
        w-64 bg-neutral-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}
      >
        <div className="flex items-center justify-center text-[20px] border-b h-16 border-gray-700 gap-2">
          <SiCoffeescript />
          <h2>CoffeTime Admin</h2>
          {/* Close Button - Mobile Only */}
          <button
            className="md:hidden m-auto text-black"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li className="hover:bg-gray-300 p-4 flex items-center gap-3 cursor-pointer">
              <Link
                className="hover:bg-gray-300 p-4 flex items-center gap-3 cursor-pointer"
                to="/admin/menu"
              >
                <FaCartShopping />
                <p>Manage Menu</p>
              </Link>
            </li>
            <li className="hover:bg-gray-300 p-4 flex items-center gap-3 cursor-pointer">
              <Link
                className="hover:bg-gray-300 p-4 flex items-center gap-3 cursor-pointer"
                to="/admin/order"
              >
                <FaCog />
                <p>Manage Order</p>
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-300 p-4 flex items-center gap-3 cursor-pointer"
                to="/menu"
              >
                <MdExitToApp />
                <p>Exit</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
