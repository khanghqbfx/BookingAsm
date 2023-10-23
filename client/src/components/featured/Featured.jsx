import "./featured.css";
import React  ,{useEffect, useState}from "react";
import axios from '../../utils/axios'





const Featured = () => {
  const [hotelsHN, setHotelsHN] = useState([]);
  const [hotelsHCM, setHotelsHCM] = useState([]);
  const [hotelsDN, setHotelsDN] = useState([]);

  useEffect(() => {
		async function fetchData() {
			const HN = await axios.get('/hotels/city?city=Ha Noi');
			setHotelsHN(HN.data);
      const HCM = await axios.get('/hotels/city?city=Ho Chi Minh');
			setHotelsHCM(HCM.data);
      const DN = await axios.get('/hotels/city?city=Da Nang');
			setHotelsDN(DN.data);
		}
		fetchData();
	}, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3-768x582.jpg"
          alt="Ha Noi"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{hotelsHN.length} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://cdn3.ivivu.com/2014/10/du-lich-sai-gon-cam-nang-tu-a-den-z-iVIVU.com-1-1024x614.jpeg"
          alt="Ho Chi Minh"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{hotelsHCM.length} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://www.startravel.com.my/wp-content/uploads/2022/03/Danang-ca-chep-hoa-rong.jpg"
          alt="Da Nang"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{hotelsDN.length} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;