import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './editHotel.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditHotel = () => {
    const [error, setError] = useState(false);
    const [hotel, setHotel] = useState([]);
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        axios.get(`/hotels/${params.hotelId}`)
          .then((res) => {
              setHotel(res.data);
          })
          .catch(err => console.log(err));
      }, [params.hotelId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const editHotel = {
            name: e.target.name.value,
            city: e.target.city.value,
            type: e.target.type.value,
            title: e.target.title.value,
            rooms: e.target.rooms.value.split(','),
            cheapestPrice: +e.target.cheapestPrice.value,
            desc: e.target.desc.value,
            distance: e.target.distance.value,
            photos: e.target.photos.value.split(','),
            featured: e.target.featured.value === 'true',
            address: e.target.address.value,
          };
          
        setError(validate(editHotel));
        if(!error) {
            axios.put(`/edit-hotel/${params.hotelId}`, editHotel)
                .then(res => {
                    navigate('/hotels');
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
                        <h2>Edit Hotel</h2>
                        </div>
                        <div className="addRoomInfo__board-table">
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Name</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="name" 
                                    defaultValue={hotel.name} 
                                />
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Type</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="type" 
                                    defaultValue={hotel.type} 
                                />
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">City</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="city" 
                                    defaultValue={hotel.city}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Address</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="address" 
                                    defaultValue={hotel.address}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Distance From City Center</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="distance" 
                                    defaultValue={hotel.distance}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Title</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="title" 
                                    defaultValue={hotel.title}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Description</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="desc" 
                                    defaultValue={hotel.desc}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Price</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="cheapestPrice" 
                                    defaultValue={hotel.cheapestPrice}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Featured</label>
                                </div>
                                {hotel.featured 
                                ?
                                    <select
                                        name="featured"
                                        id="featured"
                                    >
                                            <option defaultValue value={true}>YES</option>
                                            <option value={false}>NO</option>
                                        
                                    </select>
                                :   
                                    <select
                                        name="featured"
                                        id="featured"
                                    >
                                            <option defaultValue value={false}>NO</option>
                                            <option value={true}>YES</option>
                                        
                                    </select>
                                }
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Images</label>
                                </div>
                                <textarea 
                                    name="photos" 
                                    id="images" 
                                    cols="20" 
                                    rows="3"
                                    placeholder="Give comma between link images."
                                    defaultValue={hotel.photos}
                                ></textarea>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Rooms</label>
                                </div>
                                <textarea 
                                    name="rooms" 
                                    id="rooms" 
                                    cols="20" 
                                    rows="3"
                                    placeholder="Give comma between rooms title."
                                    defaultValue={hotel.rooms?.map(room => room.title)}
                                ></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" type="submit">Edit Hotel</button> 
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

export default EditHotel
