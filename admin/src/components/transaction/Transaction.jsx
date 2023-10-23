import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Transaction = ({transactions, setPage, page, totalPage}) => {

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
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th><span></span>ID</th>
                    <th><span></span>User</th>
                    <th><span></span>Hotel</th>
                    <th><span></span>Room</th>
                    <th><span></span>Date</th>
                    <th><span></span>Price</th>
                    <th><span></span>Payment Method</th>
                    <th><span></span>Status</th>
                    </tr>
            </thead>
            <tbody>
                {transactions.map((trans, i) => (
                    <tr key={i}>
                        <td><input type="checkbox" /></td>
                        <td>{trans._id}</td>
                        <td>{trans.user}</td>
                        <td>{trans.hotel.name}</td>
                        <td>{trans.room.join(', ')}</td>
                        <td>{trans.dateStart.slice(0,10).split('-').reverse().join('/')} - {trans.dateEnd.slice(0,10).split('-').reverse().join('/')}</td>
                        <td>{trans.price}</td>
                        <td>{trans.payment}</td>
                        <td><span className="table__status">{trans.status}</span></td>
                    </tr>
                ))}
            </tbody>
            { page && <tfoot>
                <tr>
                    <td></td>
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
            </tfoot>}
        </table>
    );
};

export default Transaction;
