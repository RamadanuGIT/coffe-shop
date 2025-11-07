import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetailPage = () => {
  const { id } = useParams(); // ambil orderId dari URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  const cancelOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!window.confirm("Apakah kamu yakin ingin membatalkan pesanan ini?"))
      return;

    try {
      const res = await fetch(`http://localhost:3000/api/order/${id}/cancel`, {
        method: "PATCH", // atau PUT tergantung backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setOrder((prev) => ({ ...prev, status: "Dibatalkan" }));
        alert("Pesanan berhasil dibatalkan");
      } else {
        alert(data.message || "Gagal membatalkan pesanan");
      }
    } catch (err) {
      console.error("Error membatalkan pesanan:", err);
      alert("Terjadi kesalahan, silakan coba lagi");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.order) {
          setOrder(data.order);
        } else {
          console.error("Order tidak ditemukan");
        }
      } catch (err) {
        console.error("Gagal ambil detail order:", err);
      } finally {
        setLoading(false);
      }
    };

    // Tambahkan fungsi cancelOrder

    fetchOrder();
  }, [id, navigate]);

  if (loading)
    return <p className="text-center mt-20">Memuat detail pesanan...</p>;
  if (!order)
    return <p className="text-center mt-20">Pesanan tidak ditemukan.</p>;

  return (
    <section className="min-h-screen pt-24 bg-[#eacdbd] px-6 pb-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#4b2e2b]">
        Detail Pesanan
      </h1>

      <div className="max-w-4xl mx-auto bg-[#fff9f6] p-8 rounded-2xl shadow-md border border-[#cbb2a5]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">
            Pesanan #{order._id.slice(-6).toUpperCase()}
          </h2>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              order.status === "Menunggu Pembayaran"
                ? "bg-yellow-200 text-yellow-800"
                : order.status === "Selesai"
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {order.status}
          </span>
        </div>

        <p className="mb-1">
          <span className="font-semibold">Tanggal: </span>
          {new Date(order.createdAt).toLocaleString("id-ID")}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Metode Pengiriman: </span>
          {order.metodePengiriman}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Metode Pembayaran: </span>
          {order.metodePembayaran.toUpperCase()}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Total: </span>
          {formatRupiah(order.total)}
        </p>

        <h3 className="font-semibold text-lg mb-2">Daftar Item:</h3>
        <ul className="divide-y divide-[#b09281]/50 mb-4">
          {order.items.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between py-2 text-sm sm:text-base"
            >
              <span>
                {item.productId ? item.productId.name : "Produk tidak tersedia"}{" "}
                x {item.quantity}
              </span>
              <span>
                {item.productId
                  ? formatRupiah(item.productId.price * item.quantity)
                  : "-"}
              </span>
            </li>
          ))}
        </ul>

        {order.status === "Menunggu Pembayaran" && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/payment", { state: { order } })}
              className="bg-[#cbb2a5] hover:bg-[#b09281] text-white px-6 py-3 rounded-full transition"
            >
              Bayar Sekarang
            </button>
            <button
              onClick={cancelOrder}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition"
            >
              Batalkan Pesanan
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderDetailPage;
