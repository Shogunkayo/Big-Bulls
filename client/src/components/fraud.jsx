const Fraud = ({fraudData}) => {
    return (
        <div className="fraud-container">
            <div>
                <div>
                    <h4><highlight>Wallet Address: </highlight>{fraudData.address}</h4>
                    <h4><highlight>Number of Reports: </highlight>{fraudData.count}</h4>
                </div>
                <div>
                    <h3><highlight>First Activity Reported: </highlight>{fraudData.first-seen}</h3>
                    <h3><highlight>Last Activity Reported: </highlight>{fraudData.last-seen}</h3>
                </div>
            </div>
            <div className="frauds">
                {(fraudData.recent.map((fraud, i) => (
                    <div key={i} className="fraud">
                        <h4><highlight>Reported at: </highlight>{fraud.created_at}</h4>
                        <h4><highlight>Offense Type: </highlight>{fraud.abuse_type_other}</h4>
                        <p>Description: {fraud.description}</p>
                    </div>
                )))}
            </div>
        </div>
    );
}
 
export default Fraud;