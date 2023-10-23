import React from 'react';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './user.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 8;

    useEffect(() => {
            axios.get(`/admin/users?limit=${limit}&page=${page}`)
                .then(res => {
                    setUsers(res.data.users)
                    setTotalPage(Math.ceil(res.data.count/limit))
                })
                .catch(err => console.log(err));
    }, [limit, page]);

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
            <div className="user__container">
                <div className='userInfo'>
                    <div className="userInfo__board">
                        <div className='userInfo__board-title'>
                        <h2>Users List</h2>
                        </div>
                        <div className="userInfo__board-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" /></th>
                                        <th><span></span>ID</th>
                                        <th><span></span>Username</th>
                                        <th><span></span>Full Name</th>
                                        <th><span></span>Phone Number</th>
                                        <th><span></span>Email</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => (
                                        <tr key={i}>
                                            <td><input type="checkbox" /></td>
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.email}</td>
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
                                        <td>
                                            {page} of {totalPage}
                                            <span></span>
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

export default Users