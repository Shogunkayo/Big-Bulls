import bitcoinBtn from '../assets/Bitcoin.png'
import dashBtn from '../assets/dash-d.png'
import dogeBtn from '../assets/doge.png'
import ethBtn from '../assets/etherium.png'
import liteBtn from '../assets/litecoin.png'
import moneroBtn from '../assets/monero.png'
import tetherBtn from '../assets/tether.png'

const Wallet = ({wallet, handleDisplay}) => {

    const coinIcons = {
        'bitcoin': bitcoinBtn,
        'monero': moneroBtn,
        'etherium': ethBtn,
        'dash': dashBtn,
        'doge': dogeBtn,
        'lite': liteBtn,
        'tether': tetherBtn
    }

    const handleCoin = (e) => {
        
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
                        <div key={i} className="currency" onClick={handleCoin}>
                            <img src={coinIcons[currency]} alt="currency"/>
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