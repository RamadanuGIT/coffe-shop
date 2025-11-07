import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f3]">
      {/* Navbar selalu di atas */}
      <Navbar />

      {/* Konten utama akan mengambil ruang yang tersisa */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer di bagian bawah */}
      <Footer />
    </div>
  );
}
