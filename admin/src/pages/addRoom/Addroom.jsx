import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './Addroom.css';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    const [formValues, setFormValues] = useState({});
    const [error, setError] = useState(false);
    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
		async function fetchHotels() {
			const request = await axios.get('/allHotels');
			setHotels(request.data);
			return request;
		}
        fetchHotels();
	}, []);
    console.log(error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validate(formValues));
        if(!error) {
            console.log(formValues);
            axios.post('/add-room', formValues)
                .then(res => {
                    navigate('/rooms');
                })
                .catch(err => console.log(err));
        }
    };

    const validate = (values) => {
        if(!values.name || !values.city || !values.type || !values.rooms || !values.address || !values.distance || !values.photos || !values.title || !values.desc || !values.featured || !values.cheapestPrice) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="container">
            <div className="addRoom__container">
                <div className='addRoomInfo'>
                    <div className="addRoomInfo__board">
                        <div className='addRoomInfo__board-title'>
                        <h2>Add New Room</h2>
                        </div>
                        <div className="addRoomInfo__board-table">
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Title</label>
                                </div>
                                <input type="text" name="title" onChange={handleChange}/>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Description</label>
                                </div>
                                <input type="text" name="desc" onChange={handleChange}/>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Price</label>
                                </div>
                                <input type="number" name="price" onChange={handleChange}/>
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Max People</label>
                                </div>
                                <input type="number" name="maxPeople" onChange={handleChange}/>
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Hotel</label>
                                </div>
                                <select name="hotelId" id="hotel" onChange={handleChange}>
                                    <option hidden >Choose a hotel</option>
                                    {hotels.map((hotel) => (
                                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Rooms</label>
                                </div>
                                <textarea name="roomNumbers" id="rooms" cols="20" rows="7"
                                    placeholder="Give comma between room numbers."
                                    onChange={handleChange}></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" type="submit">Add Room</button> 
                            </div>
                        </form>
                        </div>
                        <div className="error">
                            {error && <span className="error">Must Enter All Information!</span>}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default AddRoom;