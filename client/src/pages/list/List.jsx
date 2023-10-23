import "./list.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState  , useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

import axios from '../../utils/axios';
import MailList from '../../components/mailList/MailList'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [hotels, setHotels] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
			const res = await axios.get('/hotels/search', {params: {
        destination,
        options,
        date
      }});
      setHotels(res.data)
      return res
		}
		fetchData();
	}, [
    destination,
    options,
    date
  ]);

  const handleSearch = async () => {
    const res = await axios.get('/hotels/search', {params: {
      destination,
      options,
      date
    }});
    setHotels(res.data)
  };

  return (
    <div>
      <Header type="list" />
      <div className="container">
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input
                  defaultValue={destination}
                  type="text"
                  onChange={(e) => setDestination(e.target.value)}/>
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  date[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <div> 
                    <DateRange
                      onChange={(item) => setDate([item.selection])}
                      minDate={new Date()}
                      ranges={date}
                    />
                  </div>
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number" 
                      className="lsOptionInput" 
                      onChange={(e) => setOptions({ ...options, minPrice: e.target.value })}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input 
                      type="number" 
                      className="lsOptionInput" 
                      onChange={(e) => setOptions({ ...options, maxPrice: e.target.value })}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      defaultValue={options.adult}
                      onChange={(e) => setOptions({ ...options, adult: e.target.value })}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      defaultValue={options.children}
                      onChange={(e) => setOptions({ ...options, children: e.target.value })}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      defaultValue={options.room}
                      onChange={(e) => setOptions({ ...options, room: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="listResult">
              <SearchItem hotels={hotels}/>
            </div>
          </div>
        </div>
        <MailList />
        <Footer/>
      </div>
    </div>
  );
};

export default List;