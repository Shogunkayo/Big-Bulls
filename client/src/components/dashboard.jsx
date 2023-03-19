import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/navbar'
import Fraud from './fraud';
import Transactions from './transactions';
import Wallet from './wallet';
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

const Dashboard = () => {

    const [display, setDisplay] = useState(0)
    const [transactions, setTransactions] = useState('')
    const [fraudAddr, setFraudAddr] = useState('')
    const [fraudData, setFraudData] = useState('')

    const {data} = useSelector(state => state.data)

    const wallet = {
        'wallet': store.getState().data.inputData.wallet,
        'currencies': store.getState().data.inputData.currencies,
        'hashes': store.getState().data.inputData.hashes
    }

    useEffect(() => {
        console.log(display)
        if(display == 2) {
            fetch(`https://www.bitcoinabuse.com/api/reports/check?address=${wallet.wallet[0]}&api_token=oXLHUhVIAdOZsBsBx7zODdSPrBEQdsTihQbCeHyD`, {
                method: 'GET',
                mode: 'cors'
            }).then((response) => {
                response.json().then((body) => {
                    setFraudData(body)
                })
            })
        }
    }, [display])

    //const transactions = data.inputData.transactions


    /* const transac = [
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
    ] */

    return (
        <div className="dashboard-container">
            <div>
                <Navbar></Navbar>
            </div>

            <div className='dashboard-content'>
                <Wallet wallet={wallet} handleDisplay={setDisplay} handleTransactions={setTransactions}></Wallet>
                {display == 1 && (<Transactions transactions={transactions}></Transactions>)}
                {display == 2 && fraudAddr && (<Fraud fraudData={fraudData}></Fraud>)}
            </div>
        </div>
    );
}
 
export default Dashboard;