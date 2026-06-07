import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <div className="mt-20 bg-slate-950 text-white w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
