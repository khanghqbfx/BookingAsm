import { useState, useEffect } from 'react';
import Transaction from '../../components/transaction/Transaction';
import InfoBoard from '../../components/infoBoard/infoBoard';
import axios from '../../utils/axios';
import './DashBoard.css';

const DashBoard = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        axios.get('/admin/transactions')
            .then(res => setTransactions(res.data.transactions))
            .catch(err => console.log(err));
    },[]);
    
    return (
        <div className="container">
            <div className="dashboard__container">
                <InfoBoard users={users} transactions={transactions}/>
                <div className='dashboardInfo'>
                    <div className="dashboardInfo__board">
                        <div className='dashboardInfo__board-title'>
                        <h2>Lastest Transactions</h2>
                        </div>
                        <div className="dashboardInfo__board-table">
                            <Transaction transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashBoard;