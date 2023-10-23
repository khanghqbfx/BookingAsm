import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './booking.css';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';

const Booking = ({ setOpen, hotelId, user, hotel }) => {
  console.log(hotel)


    const [roomNumbers, setRoomNumbers] = useState([]);
    const [price, setPrice] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [error, setError] = useState(false);
    const [payment, setPayment] = useState('');
    const [date, setDate] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        },
    ]);

    const navigate = useNavigate();
    
    const handleSelectRoom = (e, roomPrice, roomId) => {
        const checked = e.target.checked;
        const roomNumber = +e.target.value;

        if(checked) {
            setSelectedRoom(selectedRoom + 1);
            setPrice(price + roomPrice)
            setRoomNumbers([...roomNumbers, roomNumber])
        } else {
            if(roomNumbers[0]){
                const filterRooms = roomNumbers.filter(filterRoom => filterRoom !== roomNumber)
                setRoomNumbers(filterRooms)
            }
            setSelectedRoom(selectedRoom - 1);
            setPrice(price - roomPrice)
        }
    };

    const handleReserve = async () => {
        const data = {
            user: user.username,
            hotel: hotelId,
            room: roomNumbers,
            dateStart: date[0].startDate,
            dateEnd: date[0].endDate,
            price: price,
            payment: payment
        }
        try {
            await axios.post('/transactions', data);
            navigate('/transactions');
        } catch (err) {
            setError(true);
        };
    };

    return (
        <div className='reserve'>
        <div className='rContainer'>
                <FontAwesomeIcon
                icon={faCircleXmark}
                className='rClose'
                onClick={() => setOpen(false)}
                />
            <div className='rInfo'>
                    <h3>Dates</h3>
                    <div className="rDates">
                        <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date"
                        minDate={new Date()}
                        />
                    </div>
            </div>

            <div className='rInfo'>
            <h3>Reserve Info</h3>
            <label>Your Full Name</label>
            <input type='text' defaultValue={user.fullName}/>
            <label>Your Email</label>
            <input type='text' defaultValue={user.email}/>
            <label>Your Phone Number</label>
            <input type='number' defaultValue={user.phoneNumber}/>
            <label>Your identity Card Number</label>
            <input
              type='number'
              placeholder='Card Number'
              className='rInfoInput'
            />
          </div>
        </div>
            <h3>Select Rooms </h3>
            <div className='rRoom'>
            {hotel.rooms &&
                hotel.rooms.map(room => (
                  
                <div className='rRoomItem' key={room._id}>
                  
                    <div className='rItemInfo'>
                    <div className='rTitle'>{room.title}</div>
                    <div className='rDesc'>{room.desc}</div>
                    <div className='rMax'>
                        Max people: <b>{room.maxPeople}</b>
                    </div>
                    <div className='rPrice'>${room.price}</div>
                    </div>
                    <div className='rSelectRooms'>
                    {room &&
                        room.roomNumbers.map(roomNumber => (
                        <div className='room' key={roomNumber}>
                            <label>{roomNumber}</label>
                            <input
                            type='checkbox'
                            value={roomNumber}
                            onChange={(e) => handleSelectRoom(e, room.price, room._id)}
                            />
                        </div>
                        ))}
                    </div>
                </div>
                ))}
            </div>
            <div className='rInfo'>
                <h3>Total Bill: {price}</h3>
                <div className='rBillBook'>
                    <select
                        name='payment'
                        id='payment'
                        className='payment'
                        onChange={e => setPayment(e.target.value)}
                    >
                        {!payment && <option defaultValue >Select Payment Method</option>}
                        <option value='Credit Card'>Credit Card</option>
                        <option value='Cash' >Cash</option>
                    </select>
                    <button className='rButton' onClick={handleReserve}>
                        Reserve Now!
                    </button>
                </div>
            </div>
            <div className="error">
                {error && <span className="error">Transaction Error!</span>}
            </div>
        </div>
  );
};

export default Booking;