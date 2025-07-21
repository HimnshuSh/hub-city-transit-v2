export default function displayFare() {
    return (
        <div className="fare-element-container">
            <ul className="fare-list">
                <li className="fare-items" >
                    <div>
                        <div>Regular Fare</div>
                        <span className="list-span">$.50</span>
                    </div>
                </li>
                <li className="fare-items" >
                    <div>
                        <div>Children (Ages 5 - High School)</div>
                        <span className="list-span" >$.25</span>
                    </div>
                </li>
                <li className="fare-items" >
                    <div>
                        <div>Senior Citizens (62 yrs and up)</div>
                        <span className="list-span" >$.25</span>
                    </div>
                </li>
                <li className="fare-items" >
                    <div>
                        <div>Disabled with ID</div>
                        <span className="list-span" >$.25</span>
                    </div>
                </li>
                <li className="fare-items" >
                    <div>
                        <div>HCT ID and Medicare</div>
                        <span className="list-span" >$.25</span>
                    </div>
                </li>
                <li className="fare-items" >
                    <div>
                        <div>Southern Miss ID</div>
                        <span className="list-span" >FREE</span>
                    </div>
                </li>
                <li className="fare-items" >
                    <div>
                        <div>City of Hattiesburg Employees</div>
                        <span className="list-span" >FREE</span>
                    </div>                    
                </li>
            </ul>
        </div>
    )
}