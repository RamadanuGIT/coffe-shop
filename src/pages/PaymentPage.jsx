import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { clearCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { form, metode, pembayaran, cart, total } = location.state || {};
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = async () => {
    setIsPaying(true);

    // simulasi delay pembayaran
    setTimeout(async () => {
      setIsPaying(false);
      setSuccess(true);

      const token = localStorage.getItem("token");

      try {
        // bisa juga disimpan ke backend (status "paid")
        await fetch("http://localhost:3000/api/cart/clear", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        clearCart();
        toast.success("Pembayaran berhasil!");
        navigate("/success");
      } catch (err) {
        console.error(err);
        toast.error("Gagal memperbarui pesanan");
      }
    }, 3000);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#f7ede7] px-4">
      <div className="bg-white shadow rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Simulasi Pembayaran</h2>
        <p className="mb-2">
          Metode Pembayaran: <strong>{pembayaran.toUpperCase()}</strong>
        </p>
        <p className="mb-4">
          Total:{" "}
          <strong>
            {total.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            })}
          </strong>
        </p>

        {pembayaran === "qris" && (
          <div className="mb-6">
            <img
              src="/dummy-qris.png"
              alt="QRIS Payment"
              className="w-48 h-48 mx-auto border p-2 rounded-xl"
            />
            <p className="text-sm mt-2 text-gray-500">
              Scan QR ini untuk simulasi pembayaran QRIS
            </p>
          </div>
        )}

        {isPaying ? (
          <p className="text-[#9c7b6b] font-semibold animate-pulse">
            Memproses pembayaran...
          </p>
        ) : success ? (
          <p className="text-green-600 font-bold text-lg">
            ✅ Pembayaran berhasil!
          </p>
        ) : (
          <button
            onClick={handlePay}
            className="bg-[#d1b2a5] hover:bg-[#b09383] text-white font-bold px-6 py-3 rounded-full transition"
          >
            {pembayaran === "qris" ? "Sudah Bayar" : "Bayar Sekarang"}
          </button>
        )}
      </div>
    </section>
  );
};

export default PaymentPage;
