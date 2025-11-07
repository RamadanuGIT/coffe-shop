import React, { useState, useEffect } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const paymentOptions = ["Belum Dibayar", "Lunas", "Dibatalkan"];
  const orderOptions = [
    "Menunggu",
    "Diproses",
    "Siap Diambil",
    "Sedang Diantar",
    "Selesai",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/order/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
        } else {
          alert(data.message || "Gagal ambil order");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handlePaymentStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Update payment ID:", id);

      const res = await fetch(
        `http://localhost:3000/api/order/${id}/updatePaymentStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paymentStatus: status }),
        }
      );
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, paymentStatus: status } : o))
        );
      }
    } catch (err) {
      console.error(err);
      alert("Gagal update status pembayaran");
    }
  };

  const handleOrderStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/order/${id}/updateOrderStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderStatus: status }),
        }
      );
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, orderStatus: status } : o))
        );
      }
    } catch (err) {
      console.error(err);
      alert("Gagal update status pesanan");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Belum Dibayar":
        return "bg-red-200 text-red-800";
      case "Lunas":
        return "bg-green-200 text-green-800";
      case "Dibatalkan":
        return "bg-gray-300 text-gray-800";
      case "Menunggu":
        return "bg-yellow-200 text-yellow-800";
      case "Diproses":
        return "bg-orange-200 text-orange-800";
      case "Siap Diambil":
        return "bg-blue-200 text-blue-800";
      case "Sedang Diantar":
        return "bg-purple-200 text-purple-800";
      case "Selesai":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Orders</h1>

      {/* Desktop Table */}
      <div className="hidden md:block max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Username</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border">Order Status</th>
              <th className="p-3 border">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="p-2 border">
                  {order.userId?.username || "Unknown"}
                </td>
                <td className="p-2 border">
                  Rp {order.total.toLocaleString("id-ID")}
                </td>
                <td
                  className={`p-2 border ${getStatusColor(
                    order.paymentStatus
                  )}`}
                >
                  <select
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(order._id, e.target.value)
                    }
                  >
                    {paymentOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td
                  className={`p-2 border ${getStatusColor(order.orderStatus)}`}
                >
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleOrderStatusChange(order._id, e.target.value)
                    }
                  >
                    {orderOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border">
                  {order.items.map((item) => (
                    <div key={item._id}>
                      {/* fallback: productId?.title > item.name > "Unknown" */}
                      {item.productId?.title || item.name || "Unknown"} x{" "}
                      {item.quantity}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden max-w-6xl mx-auto space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">
              {order.userId?.username || "Unknown"}
            </h3>
            <p>Total: Rp {order.total.toLocaleString("id-ID")}</p>

            <div
              className={`mb-2 p-1 rounded ${getStatusColor(
                order.paymentStatus
              )}`}
            >
              Payment:
              <select
                value={order.paymentStatus}
                onChange={(e) =>
                  handlePaymentStatusChange(order._id, e.target.value)
                }
              >
                {paymentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`mb-2 p-1 rounded ${getStatusColor(
                order.orderStatus
              )}`}
            >
              Status:
              <select
                value={order.orderStatus}
                onChange={(e) =>
                  handleOrderStatusChange(order._id, e.target.value)
                }
              >
                {orderOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm">
              Items:
              {order.items.map((item) => (
                <div key={item._id}>
                  {/* fallback: productId?.title > item.name > "Unknown" */}
                  {item.productId?.title || item.name || "Unknown"} x{" "}
                  {item.quantity}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
