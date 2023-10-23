import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './hotel.css';

const Hotels = () => {
    const [hotels , setHotels] = useState([]);
    const [page , setPage] = useState(1);
    const [totalPage , setTotalPage] = useState(1);
    const limit = 8 ;

    useEffect(()=> {
        axios.get(`/hotels?limit=${limit}&page=${page}`)
        .then(res => {
            setHotels(res.data.hotels)
            setTotalPage(Math.ceil(res.data.count / limit))
        })
        .catch(err => console.log(err))
    }, [limit , page])

    const handleDelete = (id) => {
        axios.delete(`/delete-hotel?id=${id}`)
            .then(res => {
                console.log(res)
                axios.get(`/hotels?limit=${limit}&page=${page}`)
                    .then(res => {
                        setHotels(res.data.hotels)
                        setTotalPage(Math.ceil(res.data.count/limit))
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => alert('Cannot Delete! There are transactions havenot checkout!'));  
    }

    if(page > totalPage) {
        setPage(page -1)
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
        <div className="hotel__container">
            <div className='hotelInfo'>
                <div className="hotelInfo__board">
                    <div className='hotelInfo__board-title'>
                    <h2>Hotels List</h2>
                    <a href="/addHotel">Add New</a>
                    </div>
                    <div className="hotelInfo__board-table">
                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" /></th>
                                    <th><span></span>ID</th>
                                    <th><span></span>Name</th>
                                    <th><span></span>Type</th>
                                    <th><span></span>Title</th>
                                    <th><span></span>City</th>
                                    <th><span></span>Action</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {hotels.map((hotel, i) => (
                                    <tr key={i}>
                                        <td><input type="checkbox" /></td>
                                        <td>{hotel._id}</td>
                                        <td>{hotel.name}</td>
                                        <td>{hotel.type}</td>
                                        <td>{hotel.title}</td>
                                        <td>{hotel.city}</td>
                                        <td><button className='delete-button' onClick={(e) => handleDelete(hotel._id)}>Delete</button></td>
                                        <td><a href={`/editHotel/${hotel._id}`} className='edit-button' >Edit</a></td>
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

export default Hotels