import Form from "./form";
import scanBtn from '../assets/scan.png'
import traceBtn from '../assets/trace.png'
import walletBtn from '../assets/wallet.png'
import bullBtn from '../assets/bull.png'

let colors = ['#94C595', '#191716']

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-left">
                <nav className="nav-left">
                    <img src={bullBtn} alt="bull" /> 
                    <h2>Big Bulls</h2>
                </nav>

                <div>
                    <h1>Trace <span className="highlight">Crypto</span> Transactions, <br></br><span className="highlight">Easily</span></h1>
                    <p>Powerful investigation tool that takes in public or private keys in various formats and maps them to the cryptocurrency they belong to</p>

                    <div className="home-form">
                        <Form colors={colors}></Form>
                    </div>
                </div>
            </div>

            <div className="home-right">
                <nav className="nav-right">
                    <div>
                        <button>Features</button>
                        <button>Login</button>
                        <button>Sign Up</button>
                    </div>
                </nav>

                <div className="home-features">
                    <div>
                        <img src={walletBtn} alt="wallet"></img>
                        <h3>Public or Private Key</h3>
                        <p>Display all cryptocurrencies associated with a given key and makes use of APIs from blockchain.com/explorer, blockchair.com, etherscan.io, and btcscan.org to fetch data related to transactions and holdings</p>
                    </div>
                    <div>
                        <img src={scanBtn} alt="scan"></img>
                        <h3>Scan Digital Images</h3>
                        <p>Scan digital images and extract wallet addresses using QR codes for easy access to transaction and holding details.
                        </p>
                    </div>
                    <div>
                        <img src={traceBtn} alt="trace"></img>
                        <h3>Trace Bitcoin Abuse</h3>
                        <p>
                            Extract data from Bitcoin Abuse Database to see if address has been linked to a cyber attack.Monitor stolen bitcoin on the public ledger to see when the hackers try cashing out.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;