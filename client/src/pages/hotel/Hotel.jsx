import "./hotel.css";

import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState , useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Booking from "../../components/Booking/booking";

const Hotel = ({user}) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [hotel, setHotel] = useState([]);
  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
			const res = await axios.get(`/hotels/${params.hotelId}`);
      setHotel(res.data)
		}
		fetchData();
	}, [params.hotelId]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleBook = () => {
    if(user) {
      console.log("handleBook() called")
      setOpenForm(true);
      
    }
    else {
      navigate("/login");
    }
  }

  return (
    <div>
      <Header type="list" />
      <div className="container">
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div>
            <div className="hotelWrapper">
              <button className="bookNow" onClick={handleBook}>Reserve or Book Now!</button>
              <h1 className="hotelTitle">{hotel.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{hotel.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {hotel.distance}m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${hotel.cheapestPrice} at this property and get a free airport taxi
              </span>
              <div className="hotelImages">
                {hotel.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{hotel.title}</h1>
                  <p className="hotelDesc">
                    {hotel.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location rating of {hotel.rating}!
                  </span>
                  <h2>
                    <b>${hotel.cheapestPrice}</b> (1 nights)
                  </h2>
                  <button onClick={handleBook}>Reserve or Book Now!</button>
                </div>
              </div>
              {openForm && <Booking setOpen={setOpenForm} hotelId={params.hotelId} user={user} hotel={hotel} />}
            </div>
          </div>
        </div>
          <MailList />
          <Footer />
      </div>
    </div>
  );
};

export default Hotel;