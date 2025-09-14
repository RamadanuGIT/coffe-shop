import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.toString().replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <section>
      <div className="min-h-screen flex flex-col items-center pt-24 bg-[#eacdbd] px-4">
        <h1 className="font-bold text-4xl mb-4 mt-6 text-center">
          Keranjang Kamu
        </h1>

        <div className="w-full flex flex-col items-center">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-6xl">
            {cart.length === 0 ? (
              <p className="col-span-full text-lg text-center mt-10">
                Keranjang Kosong
              </p>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#cbb2a5] rounded-2xl shadow-md p-4 flex flex-col items-center w-full hover:shadow-lg transition"
                >
                  <img
                    className="w-[150px] h-[100px] object-cover rounded-2xl mb-3"
                    src={item.img || item.image}
                    alt={item.name}
                  />
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>

                  <div className="flex items-center gap-2 my-2">
                    <button
                      onClick={() => decreaseQty(item.name)}
                      className="bg-[#dabfb0] px-2 rounded-2xl text-white font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.name)}
                      className="bg-[#dabfb0] px-2 rounded-2xl text-white font-bold"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-gray-700">
                    {total.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}{" "}
                    x {item.quantity} ={" "}
                    {(
                      parseInt(item.price.toString().replace(/\D/g, "")) *
                      item.quantity
                    ).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-2xl transition"
                  >
                    Hapus
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Total Section */}
        {cart.length > 0 && (
          <div className="flex flex-col items-center gap-2 px-6 py-8 w-full max-w-4xl mt-8 bg-[#cbb2a5] text-black rounded-2xl shadow">
            <p className="font-semibold text-lg">Total price:</p>
            <p className="font-bold text-xl text-black mb-2">
              {total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </p>

            {/* Detail per item */}
            <div className="w-full">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b py-1 text-black"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    {total.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/checkout"
              className="bg-[#dabfb0] hover:bg-[#b09281] text-white font-bold px-6 py-3 rounded-full transition mt-4"
            >
              Checkout sekarang
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
