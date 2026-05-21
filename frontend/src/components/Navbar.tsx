import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="w-full p-2 flex justify-between bg-slate-800 text-white items-center">
      <Link to={"/"} className="flex gap-2 items-center">
        <img src={logo} alt="Logo" className="size-16" />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">QR Roll Call</h1>
          <p className="text-gray-300 text-xs">Institutional Auth Engine</p>
        </div>
      </Link>
      <a
        href="#auth"
        className="text-sm font-bold bg-slate-700 p-2 rounded-lg h-fit hover:cursor-pointer"
      >
        Sign In / Register
      </a>
    </div>
  );
};

export default Navbar;
