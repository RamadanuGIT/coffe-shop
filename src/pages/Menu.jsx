import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Slide, toast } from "react-toastify";

const MenuList = ({ title, items, addToCart }) => {
  const [addedIdx, setAddedIdx] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});

  const handleAddToCart = (menu, idx) => {
    const hasVariants = menu.variants && menu.variants.length > 0;
    const selected = selectedVariant[menu._id] || menu.variants?.[0];

    const itemToAdd = {
      productId: menu._id,
      name: menu.title || menu.name,
      price: hasVariants ? selected.price : menu.defaultPrice,
      variant: hasVariants ? selected.name : null,
      img: menu.img || menu.image,
      quantity: 1,
    };
    console.log("Tambah ke cart:", itemToAdd);

    addToCart(itemToAdd);
    setAddedIdx(idx);
    toast.success(`Ditambahkan: ${itemToAdd.name}`, {
      autoClose: 200, // tampil 0.5 detik
      hideProgressBar: true, // opsional, hapus progress bar
      pauseOnHover: false,
      draggable: false,
      closeButton: false,
      transition: Slide, // posisi (bisa juga pakai Slide atau Zoom)
    });
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-10 mb-6 text-[#3a2a1a] font-serif">
        {title}
      </h2>

      <div className="grid gap-8 px-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items?.map((menu, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-3xl shadow-md p-5 flex flex-col items-center border border-[#eacdbd] hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${
              addedIdx === index ? "ring-2 ring-[#cbb2a5]" : ""
            }`}
          >
            <img
              className="w-[180px] h-[120px] object-cover rounded-2xl mb-3 shadow-sm"
              src={menu.img || menu.image}
              alt={menu.name}
            />

            <h3 className="font-semibold text-lg text-center mb-2">
              {menu.title}
            </h3>

            <p className="text-sm text-gray-700 text-center mb-3 line-clamp-2">
              {menu.description || menu.desc}
            </p>

            {menu.variants?.length === 1 &&
            menu.variants[0].name === "Default" ? (
              <div className="font-semibold text-[#3a2a1a] mb-2">
                Rp{menu.variants[0].price.toLocaleString("id-ID")}
              </div>
            ) : (
              <select
                onChange={(e) =>
                  setSelectedVariant((prev) => ({
                    ...prev,
                    [menu._id]: menu.variants.find(
                      (v) => v.name === e.target.value
                    ),
                  }))
                }
                className="border border-[#dabfb0] rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-[#cbb2a5] mb-3"
              >
                {menu.variants?.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name} - Rp{v.price.toLocaleString("id-ID")}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-between w-full mt-auto gap-2">
              <button
                className="bg-[#3a2a1a] text-white px-4 py-1 rounded-2xl text-sm hover:bg-[#5a3b22] transition"
                onClick={() => toast.info(`Membeli ${menu.name}`)}
              >
                Buy Now
              </button>
              <button
                className="bg-[#eacdbd] text-[#3a2a1a] px-4 py-1 rounded-2xl text-sm hover:bg-[#cbb2a5] transition"
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
    fetch("http://localhost:3000/api/menus")
      .then((res) => res.json())
      .then((data) => setMenu(data.data || []))
      .catch(() => {
        const stored = localStorage.getItem("menu");
        if (stored) setMenu(JSON.parse(stored));
      });
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

  // Ambil semua kategori unik
  const categories = ["All", ...new Set(menu.map((m) => m.category))];

  return (
    <div className="min-h-screen bg-[#f5e8df] py-20">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-[#3a2a1a] mb-3">
          Our Menu
        </h1>
        <p className="text-[#5a3b22] font-medium">
          Temukan pilihan kopi terbaik untuk harimu
        </p>
      </div>

      {/* Filter kategori */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 px-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              filterCategory === cat
                ? "bg-[#3a2a1a] text-white"
                : "bg-[#eacdbd] text-[#3a2a1a] hover:bg-[#cbb2a5]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu list per kategori */}
      <div className="max-w-7xl mx-auto">
        {Object.keys(groupedMenu).length === 0 && (
          <p className="text-center text-gray-600">Menu tidak ditemukan.</p>
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
    </div>
  );
};

export default Menu;
