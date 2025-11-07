import React, { useState, useEffect, useRef, useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { SiCoffeescript } from "react-icons/si";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const headerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek token login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const cleanToken = token.startsWith("Bearer ")
          ? token.split(" ")[1]
          : token;
        const decoded = jwtDecode(cleanToken);
        setIsLoggedIn(true);
        setIsAdmin(decoded.role === "admin");
      } catch {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  // Item navigasi
  const navItems = [
    { name: "Home", type: "section", id: "home" },
    { name: "About Us", type: "section", id: "about" },
    { name: "Blog", type: "section", id: "blog" },
    { name: "Menu", type: "link", path: "/menu" },
    ...(isAdmin ? [{ name: "Manage", type: "link", path: "/admin/menu" }] : []),
  ];

  const handleSearch = (e) => setSearch(e.target.value);

  const handleSectionClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Sticky effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsFixed(window.scrollY > headerRef.current.offsetTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      ref={headerRef}
      className={`transition-all duration-300 px-4 lg:px-10 flex items-center w-full ${
        isFixed
          ? "fixed top-0 left-0 z-50 bg-[#eacdbd] shadow-md text-black"
          : "absolute top-0 left-0 z-10 bg-transparent text-white drop-shadow-lg"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <p
          className={`font-bold text-2xl py-6 flex gap-1 items-center ${
            !isFixed ? "text-white drop-shadow-md" : "text-black"
          }`}
        >
          <SiCoffeescript className="text-3xl" /> CoffeTime
        </p>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden flex flex-col justify-center items-center space-y-2 z-50 ${
            !isFixed ? "text-white" : "text-black"
          }`}
        >
          <span
            className={`block w-8 h-[2px] bg-current origin-top-left transition-transform duration-300 ${
              menuOpen ? "rotate-45" : ""
            }`}
          ></span>
          <span
            className={`block w-8 h-[2px] bg-current transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-8 h-[2px] bg-current origin-bottom-left transition-transform duration-300 ${
              menuOpen ? "-rotate-45" : ""
            }`}
          ></span>
        </button>

        {/* Menu */}
        <nav
          className={`absolute top-full right-4 bg-[#eacdbd] shadow-lg rounded-lg py-5 w-56 transition-all lg:static lg:bg-transparent lg:shadow-none lg:rounded-none lg:w-auto ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 font-bold">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.type === "section" ? (
                  <button
                    className={`block py-2 px-4 lg:p-0 hover:text-[#b09281] cursor-pointer ${
                      !isFixed ? "text-white drop-shadow-md" : "text-black"
                    }`}
                    onClick={() => {
                      handleSectionClick(item.id);
                      setMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`block py-2 px-4 lg:p-0 hover:text-[#b09281] ${
                      !isFixed ? "text-white drop-shadow-md" : "text-black"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}

            {/* Search */}
            <li>
              <input
                type="search"
                className="border w-full border-gray-300 rounded-full p-2 self-center lg:mb-0 text-black"
                placeholder="Search menu..."
                onChange={handleSearch}
              />
            </li>

            {/* Cart */}
            <li>
              <Link
                to="/cart"
                className={`flex justify-center text-3xl py-2 hover:scale-110 ${
                  !isFixed ? "text-white drop-shadow-md" : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <FaCartShopping />
              </Link>
            </li>

            {/* Profile/Login */}
            {isLoggedIn ? (
              <Link
                to="/profil"
                className="bg-[#dabfb0] rounded-2xl py-2 px-3 cursor-pointer hover:bg-[#b09281] hover:text-white transition-colors font-bold mt-2 lg:mt-0"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-[#dabfb0] rounded-2xl py-2 px-3 cursor-pointer hover:bg-[#b09281] hover:text-white transition-colors font-bold mt-2 lg:mt-0"
              >
                Login
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
