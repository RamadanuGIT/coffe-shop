import React, { useState, useEffect } from "react";

const categories = ["Coffee", "NonCoffee", "Dessert"];

const AdminMenu = () => {
  // State for menu list (load from localStorage or empty)
  const [menu, setMenu] = useState(() => {
    const stored = localStorage.getItem("menu");
    return stored ? JSON.parse(stored) : [];
  });

  // Modal state & editing item
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Filter & search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Form data
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // Save menu changes to localStorage
  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

  // Open add modal
  const openAddModal = () => {
    setFormData({
      id: null,
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setEditItem(null);
    setModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (item) => {
    setFormData({ ...item });
    setEditItem(item);
    setModalOpen(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Accept only digits for price
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image upload, convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Save item (add or edit)
  const handleSave = () => {
    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.category ||
      !formData.description.trim()
    ) {
      alert("Please fill all fields!");
      return;
    }

    if (editItem) {
      // Edit existing
      setMenu((prev) =>
        prev.map((item) => (item.id === editItem.id ? formData : item))
      );
    } else {
      // Add new with unique id
      setMenu((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  // Delete menu item
  const handleDelete = (id) => {
    if (window.confirm("Yakin hapus menu ini?")) {
      setMenu((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Filtered & searched menu
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
              <tr key={item.id} className="text-center">
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
                  Rp {Number(item.price).toLocaleString("id-ID")}
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
                    onClick={() => handleDelete(item.id)}
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
            key={item.id}
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
              <p className="text-gray-600 mb-1">
                Rp {Number(item.price).toLocaleString("id-ID")}
              </p>
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
                  onClick={() => handleDelete(item.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {editItem ? "Edit Menu" : "Add Menu"}
            </h2>

            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded p-2 w-full mb-3"
              placeholder="Menu name"
            />

            <label className="block mb-2 font-medium">Price (IDR)</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border rounded p-2 w-full mb-3"
              placeholder="Price"
            />

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
              className="mb-3"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-4"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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
