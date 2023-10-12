import React from "react";
import "./App.css";
import CreateTrain from "./shared/screens/train-managment/create-train";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffRegister from "./screens/staff/StaffRegister";
import StaffUpdate from "./screens/staff/StaffUpdate";
import StaffProfile from "./screens/staff/StaffProfile";
import LoadingView from "./components/LoadingView";
import NavbarView from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarView />
        <Routes>
          <Route path="/create-train" element={<CreateTrain />} />
          <Route path="/staff/*">
            <Route path="register" element={<StaffRegister />} />
            <Route path="update" element={<StaffUpdate />} />
            <Route path="profile" element={<StaffProfile />} />
            <Route path="testing" element={<LoadingView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
