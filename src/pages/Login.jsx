import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Login sukses", {
          autoClose: 200, // tampil 0.5 detik
          hideProgressBar: true, // opsional, hapus progress bar
          pauseOnHover: false,
          draggable: false,
          closeButton: false,
          transition: Slide,
        });
        navigate("/");
      } else {
        toast.error("Login gagal", {
          autoClose: 800, // tampil 0.5 detik
          hideProgressBar: true, // opsional, hapus progress bar
          pauseOnHover: false,
          draggable: false,
          closeButton: false,
          transition: Slide,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error", {
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
        <h2 className="text-2xl font-bold text-center pb-8">Sign In</h2>
        <form onSubmit={handleLogin}>
          {/* Username Field */}
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="mb-1 font-medium">
              Username
            </label>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="border-2 rounded-2xl p-2 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border-2 rounded-2xl p-2 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#eacdbd] border text-black rounded-2xl py-2 font-semibold hover:bg-[#c8b0a3] transition duration-200">
            Sign In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
