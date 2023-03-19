const Transactions = ({transactions}) => {
    return (
        <div className="transaction-container">
            <h2> Transaction History</h2>
            <div className="transactions">
                {
                    transactions.e != null && transactions.e.map((transaction,i) => (
                        <div className="transaction" key={i}>
                            {console.log(transaction)}
                        <div>
                            <h4><span className="highlight">Transaction Hash: </span>{transaction.transaction_hash}</h4>
                            <h4><span className="highlight">Recepient: </span>{transaction.recipient}</h4>
                            <div>
                                <h5><span className="highlight">Sender: </span>{transaction.sender}</h5>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h5><span className="highlight">Time: </span>{transaction.time}</h5>
                            </div>
                            <div>
                                <h5><span className="highlight">USD Amount: </span>{transaction.value_usd}</h5>
                            </div>
                        </div>

                    </div>
                    ))
                }
                {transactions.e == null && transactions.map((transaction, i) => (
                    <div className="transaction" key={i}>
                        <div>
                            <h4><span className="highlight">Transaction Hash: </span>{transaction.hash}</h4>
                            <h4><span className="highlight">Recepient: </span>{transaction.recipient}</h4>
                            <div>
                                <h5><span className="highlight">Transaction ID: </span>{transaction.trans_id}</h5>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h5><span className="highlight">Time: </span>{transaction.time}</h5>
                            </div>
                            <div>
                                <h5><span className="highlight">Satoshi Value: </span>{transaction.value}</h5>
                            </div>
                            <div>
                                <h5><span className="highlight">USD Value: </span>{transaction.value_usd}</h5>
                            </div>
            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Transactions;