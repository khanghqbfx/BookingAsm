import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './editRoom.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditRoom = () => {
    const [error, setError] = useState(false);
    const [room, setRoom] = useState([]);
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        axios.get(`/rooms/${params.roomId}`)
          .then((res) => {
              setRoom(res.data);
          })
          .catch(err => console.log(err));
	}, [params.roomId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const editRoom = {
            title: e.target.title.value,
            price: +e.target.price.value,
            maxPeople: +e.target.maxPeople.value,
            desc: e.target.desc.value,
            roomNumbers: e.target.roomNumbers.value.split(',')
          };
          
        setError(validate(editRoom));
        if(!error) {
            axios.put(`/edit-room/${params.roomId}`, editRoom)
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
                        <h2>Edit Room</h2>
                        </div>
                        <div className="addRoomInfo__board-table">
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Title</label>
                                </div>
                                <input type="text" name="title" defaultValue={room.title}/>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Description</label>
                                </div>
                                <input type="text" name="desc" defaultValue={room.desc}/>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Price</label>
                                </div>
                                <input type="number" name="price" defaultValue={room.price}/>
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Max People</label>
                                </div>
                                <input type="number" name="maxPeople" defaultValue={room.maxPeople}/>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Rooms</label>
                                </div>
                                <textarea 
                                    name="roomNumbers" 
                                    id="rooms" 
                                    cols="20" 
                                    rows="7"
                                    placeholder="Give comma between room numbers."
                                    defaultValue={room.roomNumbers}
                                ></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" type="submit">Edit Room</button> 
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

export default EditRoom;