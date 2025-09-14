import React, { useState, useEffect, useRef, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCoffee } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { SiCoffeescript } from "react-icons/si";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const headerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSectionClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "Home", type: "section", id: "home" },
    { name: "About Us", type: "section", id: "about" },
    { name: "Blog", type: "section", id: "blog" },
    { name: "Menu", type: "link", path: "/menu" },
  ];

  // Sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsFixed(window.scrollY > headerRef.current.offsetTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      ref={headerRef}
      className={`transition-all px-4 lg:px-10 flex items-center w-full ${
        isFixed
          ? "fixed top-0 left-0 z-50 bg-[#eacdbd] opacity-80 shadow-md"
          : "absolute top-0 left-0 z-10 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <p className="font-bold text-2xl py-6 flex gap-1">
          <SiCoffeescript className="text-3xl" /> CoffeTime
        </p>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center space-y-2 z-50"
        >
          <span
            className={`block w-8 h-[2px] bg-black origin-top-left transition-transform duration-300  ${
              menuOpen ? "rotate-45 " : ""
            }`}
          ></span>
          <span
            className={`block w-8 h-[2px] bg-black transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-8 h-[2px] bg-black origin-bottom-left transition-transform duration-300 ${
              menuOpen ? "-rotate-45 " : ""
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
                    className="block text-black py-2 px-4 lg:p-0 hover:text-[#b09281] cursor-pointer"
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
                    className="block text-black py-2 px-4 lg:p-0 hover:text-[#b09281]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            <li className="flex items-center space-x-2 lg:ml-4 ">
              <input
                type="search"
                className="border w-full border-gray-300 rounded-full p-2 self-center lg:mb-0"
                placeholder="Search menu..."
                onChange={handleSearch}
              />
            </li>
            <li>
              <Link
                to="/cart"
                className="flex text-center justify-center hover:scale-125 text-3xl py-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaCartShopping />
              </Link>
            </li>
            <button className=" bg-[#dabfb0] rounded-2xl py-2 px-3 cursor-pointer hover:bg-[#b09281] hover:text-white transition-colors font-bold mt-2 lg:mt-0">
              User
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
