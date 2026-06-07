import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { logout } from "../../feature/AuthThunk";
import { NavbarAdminSelect } from "../../types/SampleDetails";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [openNavbar, setOpenNavbar] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setOpenNavbar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative text-xs" ref={navbarRef}>
      <button
        onClick={() => setOpenNavbar((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 shadow-md transition-all hover:bg-blue-600"
      >
        <User className="size-5 text-white" />
      </button>

      {openNavbar && (
        <DetailNavBar
          userName={user?.username}
          closeNavbar={() => setOpenNavbar(false)}
        />
      )}
    </div>
  );
};

export default NavbarAdmin;

const DetailNavBar = ({
  userName,
  closeNavbar,
}: {
  userName?: string;
  closeNavbar: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 top-14 z-50 w-48 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl text-xs">
      <div className="border-b border-slate-700 px-4 py-3">
        <p className="text-xs text-slate-400">Signed in as</p>
        <p className="truncate font-medium text-white">{userName || "Admin"}</p>
      </div>

      <div className="py-2">
        {NavbarAdminSelect.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              closeNavbar();
              navigate(item.link);
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-slate-200 transition-colors hover:bg-slate-800"
          >
            <item.icon className="size-4" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 p-2">
        <button
          onClick={() => dispatch(logout())}
          className="w-full rounded-lg px-4 py-2.5 text-left text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
