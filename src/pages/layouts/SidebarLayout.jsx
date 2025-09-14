import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar";

export default function SidebarLayout() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
