import testBtn from '../assets/wallet.png'

const Wallet = ({wallet, handleDisplay}) => {

    const coinIcons = {
        'bitcoin': testBtn,
        'monero': testBtn,
        'ether': testBtn
    }

    return (
        <div className="wallet-container">
            <div>
                <h3>Wallet Address</h3>
                <h4>{wallet.wallet}</h4>
            </div>

            <div>
                <h3>Associated Currencies</h3>
                <div className="currencies">
                    {(typeof wallet.currencies === 'undefined' || wallet.currencies == 0) && (
                        <h4 className='currency-error'>No known currencies found</h4>
                    )}
                    {wallet.currencies?.map((currency, i) => (
                        <div key={i} className="currency">
                            <img src={testBtn} alt="currency"/>
                            <h4>{currency}</h4>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='wallet-nav'>
                <button className='wallet-nav-btn' onClick={() => {handleDisplay(0)}}>Transactions</button>
                <button className='wallet-nav-btn' onClick={() => {handleDisplay(1)}}>Fraud Analysis</button>
            </div>

        </div>
    );
}
 
export default Wallet;