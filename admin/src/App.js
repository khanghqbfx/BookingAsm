import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login/login";
import Header from "./components/hearder/hearder";
import SiderBar from "./components/siderBar/siderbar";
import DashBoard from "./pages/DashBoard/DashBoard";
import Users from "./pages/user/user";
import Hotels from "./pages/hotels/hotel";
import Rooms from "./pages/Room/room";
import AddRoom from "./pages/addRoom/Addroom";
import EditHotel from "./pages/editHotel/editHotel";
import EditRoom from "./pages/editRoom/editRoom";
import Transactions from "./pages/transactions/Transactions";
import AddHotel from "./pages/addHotels/AddHotel";

function App() {
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  return (
    <BrowserRouter>
      <Header />
      <SiderBar admin={admin} setAdmin={setAdmin} />
      <Routes>
        <Route
          path="/"
          element={<Login admin={admin} setAdmin={setAdmin} />}
        ></Route>
        <Route path="/dashboard" element = {<DashBoard />} />
        <Route path="/user" element= {<Users />} />
        <Route path="/hotels" element = {<Hotels />} />
        <Route path="/rooms" element ={<Rooms />} />
        <Route path="/addHotel" element={<AddHotel />} />
        <Route path="/addRoom" element ={<AddRoom />} />
        <Route path="/editHotel/:hotelId" element={<EditHotel/>}/>
        <Route path="/editRoom/:roomId" element={<EditRoom/>}/> 
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
