import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-[#f8ede7] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1 }}
          className="mb-6 flex justify-center"
        >
          <span className="text-green-600 text-6xl">✅</span>
        </motion.div>

        <h1 className="text-2xl font-bold text-[#6b4f3b] mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-600 mb-6">
          Terima kasih telah melakukan pemesanan. Pesananmu sedang diproses.
          Kami akan menghubungi kamu jika pesanan sudah siap.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-[#d1b2a5] hover:bg-[#b09383] text-white font-semibold py-2 px-4 rounded-full transition"
          >
            Kembali ke Beranda
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border border-[#d1b2a5] text-[#6b4f3b] hover:bg-[#efe2dc] font-semibold py-2 px-4 rounded-full transition"
          >
            Lihat Riwayat Pesanan
          </button>
        </div>
      </motion.div>

      <p className="text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} CoffeeHub. Semua hak dilindungi.
      </p>
    </section>
  );
};

export default SuccessPage;
