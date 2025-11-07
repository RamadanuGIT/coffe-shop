import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.success) {
          setCartItems(data.cart.items);
        } else {
          alert("Gagal ambil data keranjang: " + data.error);
        }
      } catch (error) {
        console.error(error);
        alert("Gagal ambil data keranjang, cek koneksi.");
      }
    };

    fetchCart();
  }, [navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  const updateQty = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart.items);
      } else {
        alert("Gagal update quantity");
      }
    } catch (error) {
      console.error(error);
      alert("Error saat update quantity");
    }
  };

  const deleteItem = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart.items);
      } else {
        alert("Gagal hapus item");
      }
    } catch (error) {
      console.error(error);
      alert("Error saat hapus item");
    }
  };

  return (
    <section className="min-h-screen bg-[#eacdbd] flex flex-col items-center pt-24 px-6">
      <h1 className="text-5xl font-serif font-bold text-[#3a2a1a] mb-4 text-center">
        Keranjang Kamu
      </h1>
      <p className="text-center text-[#5c4533] mb-10 opacity-80">
        Nikmati kemudahan berbelanja, semua pesananmu ada di sini ☕
      </p>

      <div className="w-full max-w-6xl">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg mt-20 font-medium text-[#3a2a1a]">
            Keranjang masih kosong 🍃
          </p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-[#f5e8df] rounded-3xl shadow-md p-5 flex flex-col items-center hover:shadow-2xl transition-all duration-300 relative"
              >
                <img
                  className="w-[160px] h-[120px] object-cover rounded-2xl mb-4 shadow"
                  src={item.img}
                  alt={item.name}
                />
                <h3 className="font-serif text-xl font-semibold text-[#3a2a1a] text-center mb-1">
                  {item.name}
                </h3>
                <p className="text-sm italic text-[#5c4533] mb-3">
                  {item.variant && `(${item.variant})`}
                </p>

                <div className="flex items-center gap-3 my-2 bg-[#dabfb0]/60 px-3 py-1 rounded-full shadow-inner">
                  <button
                    onClick={() =>
                      updateQty(
                        item.productId,
                        item.quantity > 1 ? item.quantity - 1 : 1
                      )
                    }
                    className="bg-[#b09382] hover:bg-[#a07f6b] text-white w-8 h-8 rounded-full font-bold transition"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#3a2a1a] text-lg w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.productId, item.quantity + 1)}
                    className="bg-[#b09382] hover:bg-[#a07f6b] text-white w-8 h-8 rounded-full font-bold transition"
                  >
                    +
                  </button>
                </div>

                <p className="text-[#3a2a1a] text-sm mt-2">
                  {formatRupiah(item.price)} x {item.quantity} ={" "}
                  <b>{formatRupiah(item.price * item.quantity)}</b>
                </p>

                <button
                  onClick={() => deleteItem(item.productId)}
                  className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full transition"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="w-full max-w-4xl mt-16 bg-[#f5e8df] text-[#3a2a1a] rounded-3xl shadow-lg p-8 border border-[#cbb2a5]/60">
          <h2 className="text-2xl font-serif font-bold mb-4 text-center">
            Ringkasan Pesanan
          </h2>

          <div className="divide-y divide-[#cbb2a5]">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between py-3 text-sm font-medium"
              >
                <span>
                  {item.name}{" "}
                  {item.variant && (
                    <span className="italic text-[#5c4533]">
                      ({item.variant})
                    </span>
                  )}{" "}
                  × {item.quantity}
                </span>
                <span>{formatRupiah(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 text-lg font-semibold">
            <span>Total</span>
            <span className="text-xl font-bold text-[#3a2a1a]">
              {formatRupiah(total)}
            </span>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              to="/checkout"
              className="bg-[#3a2a1a] hover:bg-[#5a3b22] text-white font-semibold px-10 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Checkout Sekarang
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
