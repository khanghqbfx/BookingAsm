import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/login";
import SignUp from "./pages/Singup/singup.jsx";
import Transaction from "./pages/transaction/transaction";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setUser={setUser} />}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/transactions" element={<Transaction user={user}/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:hotelId" element={<Hotel user={user}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
