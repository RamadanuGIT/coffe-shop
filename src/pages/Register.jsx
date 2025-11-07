import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("registerUsername", data.user?.username);
        toast.success("Register berhasil", {
          autoClose: 800, // tampil 0.5 detik
          hideProgressBar: true, // opsional, hapus progress bar
          pauseOnHover: false,
          draggable: false,
          closeButton: false,
          transition: Slide,
        });
        navigate("/login");
      } else {
        toast.success("Register gagal", {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eacdbd] px-4">
      <div className="flex flex-col bg-[#ded5c3] rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-center pb-8">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="mb-1 font-medium">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="border-2 rounded-2xl p-2 focus:outline-none"
              type="text"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border-2 rounded-2xl p-2 focus:outline-none"
              type="email"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border-2 rounded-2xl p-2 focus:outline-none"
              type="password"
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#eacdbd] border text-black rounded-2xl py-2 font-semibold hover:bg-[#c8b0a3] transition duration-200">
            Sign Up
          </button>
        </form>
        <p>
          Do you have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
