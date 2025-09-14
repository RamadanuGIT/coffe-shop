import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [form, setForm] = useState({ nama: "", alamat: "", hp: "" });
  const [metode, setMetode] = useState("pickup");
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.hp || (metode === "delivery" && !form.alamat)) {
      toast.error("Semua data harus diisi");
      return;
    }
    toast.success("Pesanan berhasil terima kasih.");
    navigate("/");
  };

  return (
    <section>
      <div className="min-h-screen flex flex-col items-center pt-24 bg-[#eacdbd] px-4">
        <h1 className="ffont-bold text-4xl mb-4 mt-6 text-center">Checkout</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-8 w-full max-w-md flex flex-col gap-4"
        >
          <div className="flex gap-4 mb-2">
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
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          {metode === "delivery" && (
            <input
              type="text"
              name="alamat"
              placeholder="Alamat"
              value={form.alamat}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          )}
          <input
            type="text"
            name="hp"
            placeholder="No. HP"
            value={form.hp}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-[#dabfb0] hover:bg-[#b09281] text-white font-bold px-6 py-3 rounded-full transition"
          >
            Konfirmasi pemesanan
          </button>
        </form>
        <div className="bg-[#cbb2a5] rounded-2xl shadow p-6 mt-8 w-full max-w-md">
          <h2 className="font-bold text-xl mb-2">Ringkasan Pesanan</h2>
          <p className="mb-2">
            <span className="font-semibold">Metode: </span>
            {metode === "pickup" ? "pick up" : "Delivery"}
          </p>
          {cart.length === 0 ? (
            <p>Keranjang Kosong.</p>
          ) : (
            <ul className="mb-2">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b py-1">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>
              {total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
