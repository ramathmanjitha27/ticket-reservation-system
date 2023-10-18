import React from "react";
import "./App.css";
import CreateTrain from "./screens/train-managment/create-train";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffRegister from "./screens/staff/StaffRegister";
import StaffUpdate from "./screens/staff/StaffUpdate";
import StaffProfile from "./screens/staff/StaffProfile";
import LoadingView from "./components/LoadingView";
import NavbarView from "./components/Navbar";
import MakeReservation from "./screens/reservations/MakeReservation";
import TravelDetails from "./screens/reservations/TravelDetails";
import UpdateReservation from "./screens/reservations/UpdateReservation";
import StaffLogin from "./screens/authentication/StaffLogin";
import TrainList from "./screens/train-managment/train-list";
import EditTrain from "./screens/train-managment/edit-train";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarView />
        <Routes>
          <Route path="/create-train" element={<CreateTrain />} />
          <Route path="/edit-train" element={<EditTrain />} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/staff/*">
            <Route path="register" element={<StaffRegister />} />
            <Route path="login" element={<StaffLogin />} />
            <Route path="update" element={<StaffUpdate />} />
            <Route path="profile" element={<StaffProfile />} />
            <Route path="testing" element={<LoadingView />} />
          </Route>
          <Route path="/reservations/*">
            <Route path="new" element={<MakeReservation />} />
            <Route path="update" element={<UpdateReservation />} />
            <Route path="details" element={<TravelDetails />} />    
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
