import {
  faUser,
  faHouse,
  faTruckFast,
  faHouseMedical,
  faDoorClosed,
  faDoorOpen,
  faBox,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import "./siderbar.css";

const SiderBar = ({ admin, setAdmin }) => {
     const navigate =  useNavigate()
     
      const loguotClick = async() => {
        try{
            await axios.post('/logout')
            localStorage.removeItem('admin')
            setAdmin(null);
            navigate('/')
        }catch(err) {
            console.log(err)
        }
      }
  return (
    <div className="sidebar">
      <div className="center">
        {admin && (
          <ul>
            <div>
              <p className="title">MAIN</p>
              <li>
                <a href="/dashboard">
                  <FontAwesomeIcon icon={faBox} />
                  <span> Dashboard</span>
                </a>
              </li>
              <p className="title">LIST</p>
              <li>
                <a href="/user">
                  <FontAwesomeIcon icon={faUser} />
                  <span>User</span>
                </a>
              </li>

              <li>
                <a href="/hotels">
                  <FontAwesomeIcon icon={faHouse} />
                  <span>Hotels</span>
                </a>
              </li>

              <li>
                <a href="/rooms">
                  <FontAwesomeIcon icon={faDoorClosed} />
                  <span>Room</span>
                </a>
              </li>

              <li>
                <a href="/transactions">
                  <FontAwesomeIcon icon={faTruckFast} />
                  <span>transactions</span>
                </a>
              </li>
              <p className="title">NEW</p>
              <li>
                <a href="/addHotel">
                  <FontAwesomeIcon icon={faHouseMedical} />
                  <span>New Hotel</span>
                </a>
              </li>
              <li>
                <a href="/addRoom">
                  <FontAwesomeIcon icon={faDoorOpen} />
                  <span> New Room</span>
                </a>
              </li>
              <p className="title">USER</p>
              <li>
                <a href="/">
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span onClick={loguotClick}>Loguot</span>
                </a>
              </li>
            </div>
          </ul>
        )}
        ;
        {!admin && (
          <ul>
            <div>
              <p className="title"></p>
              <li>
                <a href="/">
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span> Login</span>
                </a>
              </li>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SiderBar;
