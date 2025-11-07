import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Checkout = () => {
  const { cart, loading, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loadingCheckout, setLoadingCheckout] = useState(true);

  // state untuk form
  const [form, setForm] = useState({
    username: "",
    handphone: "",
    alamat: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [metode, setMetode] = useState("pickup");
  const [pembayaran, setPembayaran] = useState("cash");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ambil data profil
  useEffect(() => {
    const initCheckout = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Anda harus login");
        navigate("/login");
        return;
      }

      // decode token
      let userIdFromToken;
      try {
        const decoded = jwtDecode(token);
        userIdFromToken = decoded.id || decoded._id || decoded.userId;
      } catch (err) {
        console.log(err);
        toast.error("Token tidak valid, silakan login ulang");
        navigate("/login");
        return;
      }

      // fetch profil
      try {
        const res = await fetch("http://localhost:3000/api/users/profil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.user) {
          setForm({
            username: data.user.username || "",
            handphone: data.user.handphone || "",
            alamat: data.user.alamat || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCheckout(false);
      }
    };

    initCheckout();
  }, [navigate]);

  if (loadingCheckout || loading) return <p>Loading...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("== MULAI HANDLE SUBMIT ==");

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Anda harus login");
      return;
    }

    let userIdFromToken = null;

    try {
      const decoded = jwtDecode(token);
      console.log("Hasil decode token:", decoded);
      userIdFromToken = decoded.id || decoded._id || decoded.userId;
      console.log("User ID dari token:", userIdFromToken);
    } catch (err) {
      console.error("Token tidak valid:", err);
      toast.error("Token tidak valid");
      return;
    }

    if (!userIdFromToken) {
      toast.error("User ID tidak ditemukan dalam token");
      return;
    }

    if (
      !form.username ||
      !form.handphone ||
      (metode === "delivery" && !form.alamat)
    ) {
      toast.error("Semua data harus diisi");
      return;
    }

    try {
      console.log("🛒 Isi cart:", cart);

      const bodyData = {
        userId: userIdFromToken,
        customer: { nama: form.username, hp: form.handphone },
        alamat: form.alamat,
        metodePengiriman: metode,
        metodePembayaran: pembayaran,
        total,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          variant: item.variant,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      console.log("Body yang dikirim:", bodyData);

      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal membuat pesanan");

      toast.success("Pesanan berhasil dibuat!");
      clearCart();
      navigate("/success");
    } catch (err) {
      console.error("Error membuat pesanan:", err);
      toast.error("Gagal memproses pesanan");
    }
  };

  // Kosongkan cart di backend
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3000/api/cart/clear", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  return (
    <section className="min-h-screen flex flex-col items-center pt-24 bg-[#eacdbd] px-4 pb-10">
      <h1 className="font-bold text-4xl mb-6 text-center text-[#4b2e2b]">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        {/* FORM PEMESANAN */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#fff9f6] rounded-2xl shadow-lg p-8 flex-1 flex flex-col gap-4"
        >
          <h2 className="font-bold text-2xl text-[#4b2e2b] mb-2">
            Data Pemesanan
          </h2>

          {/* Metode Pengambilan */}
          <div>
            <p className="font-semibold mb-2">Metode Pengambilan:</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="metode"
                  value="pickup"
                  checked={metode === "pickup"}
                  onChange={() => setMetode("pickup")}
                />
                Pick Up
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="metode"
                  value="delivery"
                  checked={metode === "delivery"}
                  onChange={() => setMetode("delivery")}
                />
                Delivery
              </label>
            </div>
          </div>

          {/* Data Form */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="username"
              placeholder="Nama Lengkap"
              value={form.username}
              onChange={handleChange}
              className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cbb2a5]"
            />

            {metode === "delivery" && (
              <textarea
                name="alamat"
                placeholder="Alamat Lengkap"
                value={form.alamat}
                onChange={handleChange}
                className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cbb2a5]"
              ></textarea>
            )}

            <input
              type="text"
              name="handphone"
              placeholder="Nomor HP / WhatsApp"
              value={form.handphone}
              onChange={handleChange}
              className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cbb2a5]"
            />
          </div>

          {/* Metode Pembayaran */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-semibold">Metode Pembayaran:</label>
            <select
              value={pembayaran}
              onChange={(e) => setPembayaran(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="cash">Bayar di Tempat (COD)</option>
              <option value="transfer">Transfer Bank</option>
              <option value="ewallet">E-Wallet (DANA, OVO, GoPay)</option>
              <option value="qris">QRIS</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-5 bg-[#dabfb0] hover:bg-[#b09281] text-white font-bold px-6 py-3 rounded-full transition"
          >
            Konfirmasi Pemesanan
          </button>
        </form>

        {/* RINGKASAN PESANAN */}
        <div className="bg-[#cbb2a5] rounded-2xl shadow-lg p-8 flex-1 text-[#3a2b29]">
          <h2 className="font-bold text-2xl mb-3">Ringkasan Pesanan</h2>
          <p className="mb-3">
            <span className="font-semibold">Metode: </span>
            {metode === "pickup" ? "Pick Up" : "Delivery"}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Pembayaran: </span>
            {
              {
                cash: "Bayar di Tempat (COD)",
                transfer: "Transfer Bank",
                ewallet: "E-Wallet (DANA, OVO, GoPay)",
                qris: "QRIS",
              }[pembayaran]
            }
          </p>

          <ul className="mb-3 border-t border-b py-3 divide-y divide-[#b09281]/50">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between py-2 text-sm sm:text-base"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{formatRupiah(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>{formatRupiah(total)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
