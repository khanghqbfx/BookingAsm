import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({hotels}) => {
  return (
    <div>
      {hotels.map(hotel => {
        return(
          <div className="searchItem">
            <img
              src={hotel.photos[0]}
              alt={hotel.name}
              className="siImg"
            />
            <div className="siDesc">
              <h1 className="siTitle">{hotel.name}</h1>
              <span className="siDistance">{hotel.distance}m from center</span>
              <span className="siTaxiOp">{hotel.address}</span>
              <span className="siSubtitle">
                {hotel.desc}
              </span>
              <span className="siFeatures">
                {hotel.type}
              </span>
              {/* If has other features */}
              {hotel.featured ? (
                <div>
                  <span className="siCancelOpSubtitle">
                    Has support other features!
                  </span>
                </div>
              ) : (<div></div>)}
            </div>
            <div className="siDetails">
              <div className="siRating">
                <span>Rating: </span>
                <button>{hotel.rating}/5</button>
              </div>
              <div className="siDetailTexts">
                <span className="siPrice">${hotel.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <div>
                  <Link to={`/hotels/${hotel._id}`}>
                    <button className="siCheckButton">See availability</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default SearchItem;