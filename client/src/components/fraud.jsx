const Fraud = ({fraudData}) => {
    return (
        <div className="fraud-container">
            <div>
                <div>
                    <h3> <span className="highlight">Wallet Address:   </span>{fraudData.address}</h3>
                    <h3 > <span className="highlight">Number of Reports:   </span>{fraudData.count}</h3>
                </div>
                <div>
                    <h4> <span className="highlight">First Activity Reported:   </span>{fraudData.first_seen}</h4>
                    <h4> <span className="highlight">Last Activity Reported:   </span>{fraudData.last_seen}</h4>
                </div>
            </div>
            <div className="frauds">
                {(fraudData.recent.map((fraud, i) => (
                    <div key={i} className="fraud">
                        <h4> <span className="highlight">Reported at: </span>{fraud.created_at}</h4>
                        <h4 > <span className="highlight">Offense Type:   </span>{fraud.abuse_type_other != null ? fraud.abuse_type_other : 'Misc'}</h4>
                        <p>Description: {fraud.description}</p>
                    </div>
                )))}
            </div>
        </div>
    );
}
 
export default Fraud;