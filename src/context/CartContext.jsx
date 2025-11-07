import React, { createContext, useState, useEffect } from "react";
import { toast, Slide } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false); // kalau token gak ada, skip fetch

    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (data.success) setCart(data.cart.items || []);
      } catch (err) {
        console.error("Gagal fetch cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (menuItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Silakan login terlebih dahulu", {
        autoClose: 200,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        closeButton: false,
        transition: Slide,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
          variant: menuItem.variant,
          img: menuItem.img || menuItem.image || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal tambah cart");

      setCart((prev) => [...prev, { ...menuItem, quantity: 1 }]);
      toast.success(`${menuItem.name} ditambahkan ke cart!`, {
        autoClose: 200,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        closeButton: false,
        transition: Slide,
      });
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan ke cart");
    }
  };
  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetch("http://localhost:3000/api/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setCart([]); // update state supaya cart kosong
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
