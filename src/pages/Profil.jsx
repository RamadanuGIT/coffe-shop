import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const Profil = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    handphone: "",
    alamat: "",
  });

  const isAuthenticated = () => !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Silakan login terlebih dahulu");
      window.location.href = "/login";
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/users/profil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setFormData({
            username: data.user.username || "",
            email: data.user.email || "",
            handphone: data.user.handphone || "",
            alamat: data.user.alamat || "",
          });
        } else {
          alert("Gagal mengambil data profil");
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengambil profil");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/users/profil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Profile Berhasil diperbarui!", {
          autoClose: 200, // tampil 0.5 detik
          hideProgressBar: true, // opsional, hapus progress bar
          pauseOnHover: false,
          draggable: false,
          closeButton: false,
          transition: Slide,
        });
      } else {
        toast.error("Gagal Memperbarui!", {
          autoClose: 800, // tampil 0.5 detik
          hideProgressBar: true, // opsional, hapus progress bar
          pauseOnHover: false,
          draggable: false,
          closeButton: false,
          transition: Slide,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan server", {
        autoClose: 800, // tampil 0.5 detik
        hideProgressBar: true, // opsional, hapus progress bar
        pauseOnHover: false,
        draggable: false,
        closeButton: false,
        transition: Slide,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Kamu telah logout");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br pt-20 from-[#f3e7e9] to-[#eacdbd] flex flex-col items-center p-6 gap-8">
      {/* Form Profil */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl w-full max-w-md p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Perbarui Profil
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ceb5a7] focus:outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ceb5a7] focus:outline-none transition-all"
            />
          </div>

          {/* Handphone */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              No. Handphone
            </label>
            <input
              name="handphone"
              type="text"
              placeholder="+62..."
              value={formData.handphone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ceb5a7] focus:outline-none transition-all"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              placeholder="Alamat lengkap"
              rows={3}
              value={formData.alamat}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 resize-none focus:ring-2 focus:ring-[#ceb5a7] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ceb5a7] text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:bg-[#bfa495] hover:text-white transition-all duration-300"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>

      {/* Navigasi Aksi */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          type="button"
          onClick={() => (window.location.href = "/orders")}
          className="flex-1 bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Lihat Pesanan Saya
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Profil;
