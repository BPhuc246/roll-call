import { Route, Routes } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
