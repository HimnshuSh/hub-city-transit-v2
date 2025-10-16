import BusIcon from '../assets/icons/bus-icon2.png'


export default function displayLegend() {

    <div style="
                
            ">
        <img src="${BusIcon}" style="
                    width: 70%;
                    height: 70%;
                    object-fit: contain;
                    position: absolute;
                    transform: rotate(-45deg) rotate(${-course}deg);
                "/>
    </div>

    return (
        <div className="legend-container">
            <div className="legend-item">
                <div>Regular Stop</div>
                <div className="regular-stop-icon">
                    <div></div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Transfer Stop</div>
                <div className="transfer-stop-icon">
                    <div></div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Bus Station</div>
                <div className="bus-station-icon">
                    <img src={BusIcon} />
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Gold Bus Marker</div>
                <div className="legend-bus-icon-container"
                    style={{ backgroundColor: "hsl(44, 96%, 59%)" }}
                >
                    <div className='legend-bus-icon'>
                        <img src={BusIcon} />
                    </div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Green Bus Marker</div>
                <div className="legend-bus-icon-container"
                    style={{ backgroundColor: "hsl(112, 63%, 52%)" }}
                >
                    <div className='legend-bus-icon'>
                        <img src={BusIcon} />
                    </div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Blue Bus Marker</div>
                <div className="legend-bus-icon-container"
                    style={{ backgroundColor: "hsl(200, 100%, 50%)" }}
                >
                    <div className='legend-bus-icon'>
                        <img src={BusIcon} />
                    </div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Brown Bus Marker</div>
                <div className="legend-bus-icon-container"
                    style={{ backgroundColor: "hsl(17, 74%, 37%)" }}
                >
                    <div className='legend-bus-icon'>
                        <img src={BusIcon} />
                    </div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Red Bus Marker</div>
                <div className="legend-bus-icon-container"
                    style={{ backgroundColor: "hsl(12, 82%, 50%)" }}
                >
                    <div className='legend-bus-icon'>
                        <img src={BusIcon} />
                    </div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Purple Bus Marker</div>
                <div className="legend-bus-icon-container"
                    style={{ backgroundColor: "hsl(250, 100%, 77%)" }}
                >
                    <div className='legend-bus-icon'>
                        <img src={BusIcon} />
                    </div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div>Orange Bus Marker</div>
                <div className="legend-bus-icon-container"
                    style={{ backgroundColor: "hsl(27, 100%, 50%)" }}
                >
                    <div className='legend-bus-icon'>
                        <img src={BusIcon} />
                    </div>
                </div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div className="legend-route-name-container">
                    <div className="line-name">Gold Line</div>
                    <div className="street-name">(USM)</div>
                </div>
                <div className='legend-route-icon' style={{ backgroundColor: "hsl(44, 96%, 59%)" }}></div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div className="legend-route-name-container">
                    <div className="line-name">Green Line</div>
                    <div className="street-name">(4th Street)</div>
                </div>
                <div className='legend-route-icon' style={{ backgroundColor: "hsl(112, 63%, 52%)" }}></div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div className="legend-route-name-container">
                    <div className="line-name">Blue Line</div>
                    <div className="street-name">(Hardy Street)</div>
                </div>
                <div className='legend-route-icon' style={{ backgroundColor: "hsl(200, 100%, 50%)" }}></div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div className="legend-route-name-container">
                    <div className="line-name">Brown Line</div>
                    <div className="street-name">(7th Street)</div>
                </div>
                <div className='legend-route-icon' style={{ backgroundColor: "hsl(17, 74%, 37%)" }}></div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div className="legend-route-name-container">
                    <div className="line-name">Red Line</div>
                    <div className="street-name">(Country Club Road)</div>
                </div>
                <div className='legend-route-icon' style={{ backgroundColor: "hsl(12, 82%, 50%)" }}></div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div className="legend-route-name-container">
                    <div className="line-name">Purple Line</div>
                    <div className="street-name">(Palmer's Crossing)</div>
                </div>
                <div className='legend-route-icon' style={{ backgroundColor: "hsl(250, 100%, 77%)" }}></div>
            </div>
            <hr className="legend-hr" />
            <div className="legend-item">
                <div className="legend-route-name-container">
                    <div className="line-name">Orange Line</div>
                    <div className="street-name">(Broadway Drive)</div>
                </div>
                <div className='legend-route-icon' style={{ backgroundColor: "hsl(27, 100%, 50%)" }}></div>
            </div>
        </div>
    )
}