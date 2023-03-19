import bitcoinBtn from '../assets/Bitcoin.png'
import dashBtn from '../assets/dash-d.png'
import dogeBtn from '../assets/doge.png'
import ethBtn from '../assets/etherium.png'
import liteBtn from '../assets/litecoin.png'
import moneroBtn from '../assets/monero.png'
import tetherBtn from '../assets/tether.png'
import Transactions from './transactions'

const Wallet = ({wallet, handleDisplay, handleTransactions}) => {

    const coinIcons = {
        'Bitcoin': bitcoinBtn,
        'bitcoin': bitcoinBtn,
        'Monero': moneroBtn,
        'monero': moneroBtn,
        'Ethereum': ethBtn,
        'ethereum': ethBtn,
        'Dash': dashBtn,
        'dash': dashBtn,
        'Dogecoin': dogeBtn,
        'dogecoin': dogeBtn,
        'Litecoin': liteBtn,
        'litecoin': liteBtn,
        'Tether': tetherBtn,
        'tether': tetherBtn
    }

    const handleCoin = (e) => {
        console.log(e.target.getAttribute('value'))
        if(e.target.getAttribute('value') == 'Ethereum'){
            handleTransactions({'e': wallet.hashes[e.target.getAttribute('value')]})
            handleDisplay(1)
        }
        else{
            console.log(wallet)
        let request_body = {'currency': e.target.getAttribute('value'), 'hashes': wallet.hashes[e.target.getAttribute('value')]}
        console.log(JSON.stringify(request_body))
        fetch('http://localhost:5000/get-transaction', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request_body),
            mode: 'cors'
        }).then((response) => {
            response.json().then((body) => {
                handleTransactions(body.transactions)
                handleDisplay(1)
            })

        })
        }
    }

    const handleFraud = () => {

    }

    return (
        <div className="wallet-container">
            <div>
                <h3>Wallet Addresses</h3>
                {wallet.wallet.map((addr, i) => (
                    <h4 key={i}>{addr}</h4>
                ))}
            </div>

            <div>
                <h3>Associated Currencies</h3>
                <div className="currencies">
                    {(typeof wallet.currencies === 'undefined' || wallet.currencies == 0) && (
                        <h4 className='currency-error'>No known currencies found</h4>
                    )}
                    {wallet.currencies?.map((currency, i) => (
                        <div key={i} className="currency" onClick={handleCoin} value={currency}>
                            <img src={coinIcons[currency]} alt="currency" value={currency}/>
                            <h4 value={currency}>{currency}</h4>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='wallet-nav'>
                <button className='wallet-nav-btn' onClick={() => {handleDisplay(0)}}>Transactions</button>
                <button className='wallet-nav-btn' onClick={() => {handleDisplay(2)}}>Fraud Analysis</button>
            </div>

        </div>
    );
}
 
export default Wallet;