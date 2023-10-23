import React from 'react';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './room.css';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 8;

    useEffect(() => {
        axios.get(`/rooms?limit=${limit}&page=${page}`)
            .then(res => {
                setRooms(res.data.rooms)
                setTotalPage(Math.ceil(res.data.count/limit))
            })
            .catch(err => console.log(err));
    }, [limit, page]);

    const handleDelete = (id) => {
        axios.delete(`/delete-room?id=${id}`)
        .then(res => {
            console.log(res);
            axios.get(`/rooms?limit=${limit}&page=${page}`)
                .then(res => {
                    setRooms(res.data.rooms)
                    setTotalPage(Math.ceil(res.data.count/limit))
                })
                .catch(err => console.log(err));
        }).catch(err => alert('Cannot Delete! There are transactions havenot checkout!'));
    }

    if(page > totalPage) {
        setPage(page - 1)
    }

    const nextPage = () => {
        if(page < totalPage) {
            setPage(page + 1)
        } else {
            setPage(1)
        }
    }
    
    const prevPage = () => {
        if(page > 1) {
            setPage(page - 1)
        } else {
            setPage(totalPage)
        }
    }

    return (
        <div className="container">
            <div className="room__container">
                <div className='roomInfo'>
                    <div className="roomInfo__board">
                        <div className='roomInfo__board-title'>
                        <h2>Rooms List</h2>
                        <a href="/addRoom">Add New</a>
                        </div>
                        <div className="roomInfo__board-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" /></th>
                                        <th><span></span>ID</th>
                                        <th><span></span>Title</th>
                                        <th><span></span>Description</th>
                                        <th><span></span>Price</th>
                                        <th><span></span>Max People</th>
                                        <th><span></span>Action</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((room, i) => (
                                        <tr key={i}>
                                            <td><input type="checkbox" /></td>
                                            <td>{room._id}</td>
                                            <td>{room.title}</td>
                                            <td>{room.desc}</td>
                                            <td>{room.price}</td>
                                            <td>{room.maxPeople}</td>
                                            <td><button className='delete-button' onClick={(e) => handleDelete(room._id)}>Delete</button></td>
                                            <td><a href={`/editRoom/${room._id}`} className='edit-button' >Edit</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="end">{page} of {totalPage}</td>
                                        <td>
                                            
                                            <button className='paging__button' onClick={() => prevPage()}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                        
                                            <button className='paging__button' onClick={() => nextPage()}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Rooms