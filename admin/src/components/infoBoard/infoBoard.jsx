import'./infoBoard.css'
import {
    faUser,
    faCartShopping,
    faSackDollar,
    faWallet
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Transaction = ({users, transactions}) => {

    return (
      <div className="dashboardInfo__board-items">
          <div className="dashboardInfo__board-item" id="users">
              <h4>Users</h4>
              <p>{users.length}</p>
              <span><FontAwesomeIcon icon={faUser} /></span>
          </div>
          <div className="dashboardInfo__board-item" id="orders">
              <h4>Transactions</h4>
              <p>{transactions.length}</p>
              <span><FontAwesomeIcon icon={faCartShopping} /></span>
          </div>
          <div className="dashboardInfo__board-item" id="earnings">
              <h4>Earnings</h4>
              <p>${transactions.map(transaction => transaction.price).reduce((prev, curr) => prev + curr, 0)}</p>
              <span>
                  <FontAwesomeIcon icon={faSackDollar} />
              </span>
          </div>
          <div className="dashboardInfo__board-item" id="balance">
              <h4>Balance</h4>
              <p>${transactions.map(transaction => transaction.price).reduce((prev, curr) => prev + curr, 0)}</p>
              <span><FontAwesomeIcon icon={faWallet} /></span>
          </div>
      </div>
    );
  };
  
  export default Transaction;