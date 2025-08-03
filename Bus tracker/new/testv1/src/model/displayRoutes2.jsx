import { useEffect, useRef, useState, useMemo } from 'react'
import { busColor } from '../components/busIcons'
import projectStopToRoute from './stopProjection'
import getNextStop from './nextstop'
import getRouteForBus from '../util/getRouteForBus'
import BusIcon from '../assets/icons/bus-icon2.png'

function StopName({stopDataArray, busData}) {

    const stopNameRef = useRef([])
    const [heights, setHeights] = useState([])

    useEffect(() => {
        setHeights(stopNameRef.current.map(ref => ref.offsetHeight))
    }, [])

    const progressheight = useMemo(() => {
        if (heights.length === 0) return [];
        
        const newProgressHeight = [];
        for (let i = 0; i < (heights.length - 1) ; i++) {
            newProgressHeight.push({
                height: (heights[i] / 2) + 25 + (heights[i + 1] / 2),
                stopName: stopDataArray[i + 1].stopName,
            });
        }
        return newProgressHeight;
    }, [heights, stopDataArray]);

    return (
        <div className='route-stop-container'>
            <div className='route-progress-container'>
                {
                    (heights.length !== 0) && <div className='route-progress-stop-icon-container'>
                        {heights.map((height, index) => <div className='route-progress-stop-icon' key={`stop-marker-${index}`} style={{height: `${height}px`}}><div><div style={{ backgroundColor:`${busColor[busData.busFullName]}` }}></div></div></div>)}
                    </div>
                }
                {
                    (heights.length !== 0) && 
                        <div
                            className='backdrop'
                            style={
                                {
                                    top: `${heights[0] / 2 + 25}px`,
                                    height: `${progressheight.reduce((acc, height) => acc + height.height, 0)}px`,
                                    position: 'absolute',
                                    width: "4px",
                                    zIndex: 2,
                                    backgroundColor: 'hsl(0, 0%, 85%)',
                                    border: 'solid hsl(0, 0%, 75%)',
                                    borderWidth: '0px 1px',
                                    marginRight: '18px'
                                }
                            }
                        >
                    </div>
                }
                {
                    (heights.length !== 0) && <div className='route-progress-bar-container' style={{ top: `${heights[0] / 2 + 25}px`}}>
                            {progressheight.map((data, index) => <div className='bus-progress' key={`bus-marker-${index}`} style={{height: `${data.height}px`, backgroundColor: "transparent", position: 'relative'}}>
                                {(busData.stopName === data.stopName) && (
                                    <div
                                        className='bus-marker'
                                        style={{
                                        height: '14px',
                                        width: '14px',
                                        borderRadius: '50%',
                                        border: `solid hsl(0, 0%, 75%) 1px`,
                                        position: 'absolute',
                                        top: `${(busData.busDistance / busData.stopDistance) * data.height - 7.5}px`,
                                        backgroundColor: `${busColor[busData.busFullName]}`,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        }}
                                    >
                                        <img src={BusIcon}/>
                                    </div>
                                    )}
                            </div>)}
                    </div>
                }
            </div>
            <div className='route-stopname-container'>
                {stopDataArray.map((stop, index) => (
                    <div key={`${stop.stopName}-${index}`} ref={el => stopNameRef.current[index] = el} className='route-stopnames'>
                        {stop.stopName}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Route({ route, showRoute, setShowRoute , busData}) {

    const ref = useRef(null)

    const id = route.features[0].properties.route_short_name

    const stopDataArray = useMemo(() => {
        const projectedStops = projectStopToRoute(route);
        projectedStops.unshift({...projectedStops[projectedStops.length - 1], distance: 0});
        return projectedStops;
    }, [route]);

    const data = useMemo(() => {
        const nextstopData = getNextStop(busData, true);
        return {
            busFullName: busData.properties.full_name,
            busDistance: nextstopData.busDistance,
            stopName: nextstopData.stopName,
            stopDistance: nextstopData.distance
        };
    }, [busData]);

    function toggleRoute() {
        setShowRoute(prev => (prev === id ? null : id))
    }

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: 'smooth'})
    }, [showRoute === id])

    return (
        <div className='route-container-items'>
            <div ref={ref} className='route-header' onClick={toggleRoute}>
                <div className='route-title'>
                    <div>{route.features[0].properties.route_short_name}</div>
                    <div>({route.features[0].properties.route_long_name})</div>
                </div>
                <div>{showRoute === id ? '-' : '+'}</div>
            </div>
            {showRoute === id && 
                <div className='route-content'>
                    <div className='route-desc'>{route.features[0].properties.route_desc}</div>
                    <StopName stopDataArray={stopDataArray} busData={data}/>
                </div>}
        </div>
    )
}

export default function DisplayRoutes({ busData }) {
    const [showRoute, setShowRoute] = useState(null)
    
    const busObject = busData.features.reduce((acc, bus) => {
        acc[bus.properties.full_name] = bus
        return acc
    }, {})


    return (
        <div className='route-container'>
            <Route route={getRouteForBus("hct Gold1")} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct Gold1"]}/>
            <hr className='route'/>
            <Route route={getRouteForBus("hct green")} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct green"]}/>
            <hr className='route'/>
            <Route route={getRouteForBus("hct blue1")} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct blue1"]}/>
            <hr className='route'/>
            <Route route={getRouteForBus("hct brown")} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct brown"]}/>
            <hr className='route'/>
            <Route route={getRouteForBus("hct red")} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct red"]}/>
            <hr className='route'/>
            <Route route={getRouteForBus("hct purple")} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct purple"]}/>
            <hr className='route'/>
            <Route route={getRouteForBus("hct orange")} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct orange"]}/>
        </div>
    )
}