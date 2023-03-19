const Transactions = ({transactions}) => {
    return (
        <div className="transaction-container">
            <h2> Transaction History</h2>
            <div className="transactions">
                {transactions.map((transaction, i) => (
                    <div className="transaction" key={i}>
                        <div>
                            <h4><span className="highlight">Transaction Hash: </span>{transaction.hash}</h4>
                            <h4><span className="highlight">Recepient: </span>{transaction.rec}</h4>
                            <div>
                                <h5><span className="highlight">Transaction Currency: </span>{transaction.currency}</h5>
                                <h5><span className="highlight">Transaction ID: </span>{transaction.id}</h5>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h5><span className="highlight">Date: </span>{transaction.date}</h5>
                                <h5><span className="highlight">Time: </span>{transaction.time}</h5>
                            </div>
                            <div>
                                <h5><span className="highlight">Currency Amount: </span>{transaction.amount}</h5>
                            </div>
                            <div>
                                <h5><span className="highlight">USD Amount: </span>{transaction.usd}</h5>
                            </div>
            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Transactions;