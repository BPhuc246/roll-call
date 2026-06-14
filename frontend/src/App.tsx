import { Route, Routes } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import MainLayout from "./layout/MainLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { fetch } from "./feature/AuthThunk";
import BroadCastQR from "./page/General/BroadCastQR";
import PastAttandance from "./page/General/PastAttandance";
import RoomManagement from "./page/General/RoomManagement";
import QrScan from "./page/General/QrScan";
import CheckCode from "./page/General/CheckCode";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/broadcast_qr" element={<BroadCastQR />} />
        <Route path="/past_attandance" element={<PastAttandance />} />
        <Route path="/room" element={<RoomManagement />} />
        <Route path="/qr/scan" element={<QrScan />} />
        <Route path="/qr/check-code" element={<CheckCode />} />
      </Route>
    </Routes>
  );
};

export default App;
