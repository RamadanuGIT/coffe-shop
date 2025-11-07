import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error("Gagal ambil pesanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  if (loading) return <p className="text-center mt-20">Memuat pesanan...</p>;

  return (
    <section className="min-h-screen pt-24 bg-[#eacdbd] px-6 pb-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#4b2e2b]">
        Riwayat Pesanan
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-700">Belum ada pesanan.</p>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#fff9f6] p-6 rounded-2xl shadow-md border border-[#cbb2a5]"
            >
              <div className="flex justify-between items-center mb-3">
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

              <p>
                <span className="font-semibold">Tanggal: </span>
                {new Date(order.createdAt).toLocaleString("id-ID")}
              </p>
              <p>
                <span className="font-semibold">Metode Pengiriman: </span>
                {order.metodePengiriman}
              </p>
              <p>
                <span className="font-semibold">Metode Pembayaran: </span>
                {order.metodePembayaran.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold">Total: </span>
                {formatRupiah(order.total)}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                {order.status === "Menunggu Pembayaran" && (
                  <button
                    onClick={() => navigate("/payment", { state: { order } })}
                    className="bg-[#cbb2a5] hover:bg-[#b09281] text-white px-4 py-2 rounded-full transition"
                  >
                    Bayar Sekarang
                  </button>
                )}
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="border border-[#cbb2a5] px-4 py-2 rounded-full hover:bg-[#f3e5dc]"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderPage;
