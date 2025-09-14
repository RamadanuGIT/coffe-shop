import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const MenuList = ({ title, items, addToCart }) => {
  const [addedIdx, setAddedIdx] = useState(null);

  const handleAddToCart = (menu, idx) => {
    addToCart(menu);
    setAddedIdx(idx);
    setTimeout(() => setAddedIdx(null), 700);
  };

  return (
    <>
      <h2 className="text-2xl font-bold self-center px-4 my-10 bg-[#cbb2a5] rounded-sm w-full">
        {title}
      </h2>
      <div className="grid gap-6 px-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items?.map((menu, index) => (
          <div
            key={index}
            className={`bg-[#cbb2a5] rounded-2xl shadow-md p-4 flex flex-col items-center w-50 max-sm:w-full transition-all duration-500 ${
              addedIdx === index
                ? "scale-105 ring-4 ring-[#dabfb0] bg-[#ffe5d0]"
                : ""
            }`}
          >
            <h3 className="font-semibold text-lg mb-2 text-center">
              {menu.name}
            </h3>
            {menu.img || menu.image ? (
              <img
                className="w-[150px] h-[100px] object-cover rounded-2xl mb-3 max-sm:w-full"
                src={menu.img || menu.image}
                alt={menu.name}
              />
            ) : (
              <div className="w-[150px] h-[100px] bg-gray-300 rounded-2xl mb-3 flex items-center justify-center text-gray-600">
                No Image
              </div>
            )}
            <p className="text-sm text-gray-700 font-bold py-2">
              {Number(menu.price).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </p>
            <p className="text-sm text-gray-700 text-center mb-3">
              {menu.description || menu.desc}
            </p>
            <div className="flex justify-between w-full gap-2 mt-auto">
              <button
                className="bg-[#eacdbd] rounded-2xl px-4 py-1 hover:bg-[#dabfb0] transition"
                onClick={() => toast.info(`Membeli ${menu.name}`)}
              >
                Buy Now
              </button>
              <button
                className="bg-neutral-200 rounded-2xl px-4 py-1 hover:bg-neutral-300 transition"
                onClick={() => handleAddToCart(menu, index)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const storedMenu = localStorage.getItem("menu");
    if (storedMenu) {
      try {
        const parsed = JSON.parse(storedMenu);
        if (Array.isArray(parsed)) {
          setMenu(parsed);
        } else {
          console.error("Menu data is not an array.");
        }
      } catch (err) {
        console.log(err);
        console.error("Invalid menu data in localStorage.");
      }
    }
  }, []);

  const filteredMenu =
    filterCategory === "All"
      ? menu
      : menu.filter((item) => item.category === filterCategory);

  const groupedMenu = filteredMenu.reduce((groups, item) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
    return groups;
  }, {});

  return (
    <div className="min-h-screen  flex flex-col text-center justify-center items-center pt-30 bg-[#eacdbd]">
      <h1 className="font-bold text-4xl mb-4">This our menus</h1>
      <p className="font-bold mb-6">Semua menu kami ada disini</p>

      {/* Filter Kategori */}
      <div className="flex gap-4 mb-8 max-w-xl w-full px-4 justify-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded max-w-xs"
        >
          <option value="All">All Categories</option>
          <option value="Coffee">Coffee</option>
          <option value="NonCoffee">NonCoffee</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      {/* Tampilkan menu per kategori */}
      {Object.keys(groupedMenu).length === 0 && (
        <p className="text-gray-700 font-semibold">Menu tidak ditemukan.</p>
      )}
      {Object.entries(groupedMenu).map(([category, items]) => (
        <MenuList
          key={category}
          title={category}
          items={items}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default Menu;
