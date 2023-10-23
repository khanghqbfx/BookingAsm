import "./featuredProperties.css";
import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";

const FeaturedProperties = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/hotels/top3');
      setHotels(res.data)
    }
    fetchData();
  }, []);

  return (
    <div className="fp">
      {hotels.map(hotel => {
        return (
          <div className="fpItem">
            <img
              src={hotel.photos[0]}
              alt={hotel.name}
              className="fpImg"
            />
            <span className="fpName"><a href={`/hotels/${hotel._id}`}>{hotel.name}</a></span>
            <span className="fpCity">{hotel.city}</span>
            <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
            <div className="fpRating">
              <button>{hotel.rating}/5</button>
              <span>Rating</span>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default FeaturedProperties;