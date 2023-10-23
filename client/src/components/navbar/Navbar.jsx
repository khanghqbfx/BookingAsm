import "./navbar.css";
import { Link } from 'react-router-dom';
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const Navbar = ({user, setUser}) => {
  const navigate = useNavigate();

  const logoutClick = async () => {
    try {
      await axios.post('/logout')
      localStorage.removeItem("user")
      setUser(null)
      navigate('/');
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
          <a href="/" className="logo">Booking Website</a>
        {!user && <div className="navItems">
          <Link  to="/sign-up">
            <button  className="navButton">
              SignUp
            </button>
          </Link>
          <Link  to="/login">
            <button  className="navButton">
              Login
            </button>
          </Link>
        </div>}
        {user && <div className="navItems">
          <span>{user.email}</span>
          <Link  to="/transactions">
            <button  className="navButton">
              Transactions
            </button>
          </Link>
          <button  className="navButton" onClick={() => logoutClick()}>
            Logout
          </button>
        </div>}
      </div>
    </div>
  )
}

export default Navbar