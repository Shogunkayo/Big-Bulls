import Form from "./form";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-left">

                <nav className="nav-left">
                    <h1>Big Bulls</h1>
                    <div>
                        <button>Features</button>
                        <button>Pricing</button>
                    </div>
                </nav>

                <div>
                    <h1>Trace Crypto Transactions, <br></br>Easily.</h1>
                    <p>Powerful investigation tool that takes in public or private keys in various formats and maps them to the cryptocurrency they belong to.</p>

                    <div className="home-form">
                        <Form></Form>
                    </div>
                </div>
            </div>

            <div className="home-right">
                <nav className="nav-right">
                    <div>
                        <button>Login</button>
                        <button>Sign Up</button>
                    </div>
                </nav>

                <div className="home-features">
                    <div>
                        <h3>Public or Private Key</h3>
                        <p>Display all cryptocurrencies associated with a given key and makes use of APIs from blockchain.com/explorer, blockchair.com, etherscan.io, and btcscan.org to fetch data related to transactions and holdings</p>
                    </div>
                    <div>
                        <h3>Scan Digital Images</h3>
                        <p>Scan digital images and extract wallet addresses using QR codes for easy access to transaction and holding details.
                        </p>
                    </div>
                    <div>
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

/*
Tagline: Trace Your Cryptocurrency Transactions with Ease

Summary: Our web application is a powerful investigation tool that allows investigators to enter public or private keys in various formats to check if they belong to a cryptocurrency. The platform displays all cryptocurrencies associated with a given key and makes use of APIs from blockchain.com/explorer, blockchair.com, etherscan.io, and btcscan.org to fetch data related to transactions and holdings. Additionally, we are developing a tool to scan digital images and extract wallet addresses using QR codes for easy access to transaction and holding details.

*/