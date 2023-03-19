import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/navbar'
import Fraud from './fraud';
import Transactions from './transactions';
import Wallet from './wallet';

const Dashboard = () => {

    const [display, setDisplay] = useState(0)

    const {data} = useSelector(state => state.data)

    const wallet = {
        'wallet': data.inputData.wallet,
        'currencies': data.inputData.currencies,
    }

    const transactions = data.inputData.transactions

    return (
        <div className="dashboard-container">
            <div>
                <Navbar changeInputData={handleInputData}></Navbar>
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