import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./pages/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/layouts/MainLayout";
import AuthLayout from "./pages/layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Profil from "./pages/Profil";
import Cart from "./pages/Cart";
import AdminOrder from "./pages/Admin/AdminOrder";
import AdminMenu from "./pages/Admin/AdminMenu";
import SidebarLayout from "./pages/layouts/SidebarLayout";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Utama */}
        <Route element={<MainLayout />}>
          {/* Halaman Home */}
          <Route path="/" element={<Hero />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route element={<AuthLayout />}>
          {/* Halaman Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<SidebarLayout />}>
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/order" element={<AdminOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
