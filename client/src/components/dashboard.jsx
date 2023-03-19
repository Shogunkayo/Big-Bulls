import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/navbar'
import Fraud from './fraud';
import Transactions from './transactions';
import Wallet from './wallet';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const [display, setDisplay] = useState(0)

    const {data} = useSelector(state => state.data)

    /* const wallet = {
        'wallet': data.inputData.wallet,
        'currencies': data.inputData.currencies,
    }

    const transactions = data.inputData.transactions */

    const wallet = {
        'wallet': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        'currencies': ['bitcoin', 'ether', 'monero', 'ether'],
    }

    const transactions = [
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
    ]

    return (
        <div className="dashboard-container">
            <div>
                <Navbar></Navbar>
            </div>

            <div className='dashboard-content'>
                <Wallet wallet={wallet} handleDisplay={setDisplay}></Wallet>
                {display == 0 && (<Transactions transactions={transactions}></Transactions>)}
                {display == 1 && (<Fraud></Fraud>)}
            </div>
        </div>
    );
}
 
export default Dashboard;