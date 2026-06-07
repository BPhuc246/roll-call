import { Route, Routes } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import MainLayout from "./layout/MainLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { fetch } from "./feature/AuthThunk";
import BroadCastQR from "./page/General/BroadCastQR";

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
      </Route>
    </Routes>
  );
};

export default App;
