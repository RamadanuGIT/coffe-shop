import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const categories = ["Coffee", "NonCoffee", "Foods"];

const AdminMenu = () => {
  const navigate = useNavigate();

  // Wajib taruh semua hook paling atas
  const [role, setRole] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [menu, setMenu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    category: "",
    isSinglePrice: false,
    singlePrice: "",
    image: "",
    variants: [
      { name: "Hot", price: "" },
      { name: "Cold", price: "" },
    ],
  });

  // Cek token dan role user saat pertama kali mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingUser(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (error) {
      console.error("Failed to decode token:", error);
      setRole("unauthorized");
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // Redirect berdasarkan role setelah role & loading selesai
  useEffect(() => {
    if (!loadingUser) {
      if (role === "unauthorized") {
        navigate("/login");
      } else if (role !== "admin") {
        navigate("/admin/menu");
      }
    }
  }, [loadingUser, role, navigate]);

  // Load menu dari backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/menus/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const mapped = data.data.map((item) => ({
            _id: item._id,
            id: item._id,
            name: item.title,
            description: item.description,
            image: item.image,
            category: item.category || "",
            variants: item.variants || [
              { name: "Hot", price: item.price || 0 },
              { name: "Cold", price: item.price || 0 },
            ],
          }));

          setMenu(mapped);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Tampilkan loading screen sampai cek token selesai
  if (loadingUser) return <div>Loading...</div>;

  const openAddModal = () => {
    setFormData({
      id: null,
      name: "",
      description: "",
      category: "",
      isSinglePrice: false,
      singlePrice: "",
      image: "",
      variants: [
        { name: "Hot", price: "" },
        { name: "Cold", price: "" },
      ],
    });
    setEditItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormData({
      id: item.id || null,
      name: item.name || "",
      description: item.description || "",
      category: item.category || "",
      isSinglePrice: item.isSinglePrice ?? false,
      singlePrice: item.singlePrice || "",
      image: item.image || "",
      variants: item.variants?.length
        ? item.variants
        : [
            { name: "Hot", price: "" },
            { name: "Cold", price: "" },
          ],
    });
    setEditItem(item);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleVariantChange = (index, value) => {
    const newVariants = [...formData.variants];
    newVariants[index].price = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      (!formData.isSinglePrice &&
        !formData.variants.every((v) => v.price && !isNaN(Number(v.price)))) ||
      (formData.isSinglePrice &&
        (!formData.singlePrice || isNaN(Number(formData.singlePrice))))
    ) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      image: formData.image,
      title: formData.name,
      description: formData.description,
      category: formData.category,
      variants: formData.isSinglePrice
        ? [
            {
              name: "Default",
              price: Number(formData.singlePrice),
            },
          ]
        : formData.variants.map((v) => ({
            name: v.name,
            price: Number(v.price),
          })),
    };

    try {
      if (editItem) {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/api/menus/admin/${editItem._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        const updated = await res.json();
        if (res.ok) {
          setMenu((prev) =>
            prev.map((item) =>
              item._id === editItem._id
                ? {
                    _id: updated.data._id,
                    id: updated.data._id,
                    name: updated.data.title,
                    description: updated.data.description,
                    image: updated.data.image,
                    category: updated.data.category || "",
                    variants: updated.data.variants || [],
                  }
                : item
            )
          );
          setModalOpen(false);
        } else {
          alert(updated.error || "Failed to update menu");
        }
      } else {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/menus/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errorText = await res.text(); // jika bukan JSON
          console.error("Error saat menambahkan menu:", errorText);
          alert("Gagal menambahkan menu: " + errorText);
          return;
        }
        const newMenu = await res.json();
        setMenu((prev) => [
          ...prev,
          {
            _id: newMenu.data._id,
            id: newMenu.data._id,
            name: newMenu.data.title,
            description: newMenu.data.description,
            image: newMenu.data.image,
            category: newMenu.data.category || "",
            variants: newMenu.data.variants || [],
          },
        ]);
        setModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Yakin hapus menu ini?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/menus/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.ok) {
        setMenu((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(result.error || "Failed to delete menu");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Menu</h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
        >
          + Add Menu
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No menu found.
                </td>
              </tr>
            )}
            {filteredMenu.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="p-2 border">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded mx-auto"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded mx-auto text-gray-600 text-sm">
                      No Image
                    </div>
                  )}
                </td>
                <td className="p-2 border">{item.name}</td>

                <td className="p-2 border">
                  {item.variants.length === 1 &&
                  item.variants[0].name === "Default" ? (
                    <>
                      Rp{" "}
                      {Number(item.variants[0].price).toLocaleString("id-ID")}
                    </>
                  ) : (
                    item.variants.map((v, i) => (
                      <div key={i}>
                        {v.name !== "Default" ? `${v.name}: ` : ""}
                        Rp {Number(v.price).toLocaleString("id-ID")}
                      </div>
                    ))
                  )}
                </td>

                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden max-w-6xl mx-auto space-y-4">
        {filteredMenu.length === 0 && (
          <div className="text-center p-4 bg-white rounded shadow">
            No menu found.
          </div>
        )}
        {filteredMenu.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded shadow p-4 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded"
                />
              ) : (
                <div className="w-28 h-28 bg-gray-300 flex items-center justify-center rounded text-gray-600 text-sm">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{item.name}</h3>

              <div className="text-gray-600 mb-1">
                {Array.isArray(item.variants) && item.variants.length > 0 ? (
                  item.variants.length === 1 ? (
                    <>
                      Rp{" "}
                      {Number(item.variants[0].price).toLocaleString("id-ID")}
                    </>
                  ) : (
                    item.variants.map((v, i) => (
                      <div key={i}>
                        {v.name}: Rp {Number(v.price).toLocaleString("id-ID")}
                      </div>
                    ))
                  )
                ) : (
                  <>Rp 0</>
                )}
              </div>

              <p className="mb-2">{item.description}</p>
              <p className="italic text-sm text-gray-500 mb-2">
                Category: {item.category}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-lg relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">
              {editItem ? "Edit Menu" : "Add Menu"}
            </h2>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full mb-3"
              placeholder="Menu name"
            />
            <label className="block mb-2 font-medium">Jenis Harga</label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priceType"
                  checked={!formData.isSinglePrice}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isSinglePrice: false,
                      singlePrice: "",
                      variants: [
                        { name: "Hot", price: "" },
                        { name: "Cold", price: "" },
                      ],
                    }))
                  }
                />
                Dengan Varian (Hot/Cold)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priceType"
                  checked={formData.isSinglePrice}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isSinglePrice: true,
                      singlePrice: "",
                      variants: [],
                    }))
                  }
                />
                Tanpa Varian (Satu Harga)
              </label>
            </div>
            <label className="block mb-2 font-medium">Variants & Prices</label>
            {formData.isSinglePrice ? (
              <>
                <label className="block mb-2 font-medium">Harga (IDR)</label>
                <input
                  type="text"
                  value={formData.singlePrice || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      singlePrice: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className="border rounded p-2 w-full mb-3"
                  placeholder="Harga menu"
                />
              </>
            ) : (
              <>
                <label className="block mb-2 font-medium">
                  Variants & Prices
                </label>
                {formData.variants.map((variant, index) => (
                  <div key={index} className="mb-3">
                    <label className="block text-sm font-medium mb-1">
                      {variant.name} Price (IDR)
                    </label>
                    <input
                      type="text"
                      value={variant.price || ""}
                      onChange={(e) =>
                        handleVariantChange(index, e.target.value)
                      }
                      className="border rounded p-2 w-full"
                      placeholder={`Price for ${variant.name}`}
                    />
                  </div>
                ))}
              </>
            )}
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded p-2 w-full mb-3 resize-y"
              rows="3"
              placeholder="Description"
            />
            <label className="block mb-2 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded p-2 w-full mb-3"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label className="block mb-2 font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 cursor-pointer file:bg-gray-500 file:text-white hover:file:bg-gray-600 p-1"
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-4"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
