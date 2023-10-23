import Header from '../../components/header/Header';
import './transaction.css';
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import MailList from './../../components/mailList/MailList';
import Footer from './../../components/footer/Footer';

const Transaction = ({user}) => {
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    axios
      .get(`/user-transactions?user=${user.username}`)
      .then(res => setTrans(res.data))
      .catch(err => {
        console.log(err);
      });
  }, [user.username]);

  return (
    <div>
      <Header type='list' />
      <div className='trans'>
        {trans.length === 0 ? (
          <h1>You don't have transaction!</h1>
        ) : (
          <table className='transTable'>
            <caption>Your Transactions</caption>

            <tr className='tableTr'>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>

            {trans.map((tran, i) => {
              return (
                <tr className={i % 2 === 0 ? 'tableRow' : ''} key={tran._id}>
                  <td>{i + 1}</td>
                  <td>{tran.hotel}</td>
                  <td>{tran.room.join(', ')}</td>
                  <td>{tran.dateStart?.slice(0,10).split('-').reverse().join('/')} - {tran.dateEnd?.slice(0,10).split('-').reverse().join('/')}</td>
                  <td>${tran.price}</td>
                  <td>{tran.payment}</td>
                  <td className={tran.status.toLowerCase()}>
                    <span>{tran.status}</span>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Transaction;