import blueRoute from '../assets/data/route/r-dj86p-blueline2.geojson.json'
import greenRoute from '../assets/data/route/r-dj86p-greenline2.geojson.json'
import goldRoute from '../assets/data/route/r-dj86pp-goldline2.geojson.json'
import redRoute from '../assets/data/route/r-dj86p-redline2.geojson.json'
import orangeRoute from '../assets/data/route/r-dj86p-orangeline2.geojson.json'
import brownRoute from '../assets/data/route/r-dj86r-brownline2.geojson.json'
import purpleRoute from '../assets/data/route/r-dj8d0-purpleline2.geojson.json'
import { useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { busColor } from '../components/busIcons'


function StopName({stopDataArray, busData}) {

    const stopNameRef = useRef([])
    const [heights, setHeights] = useState([])

    useEffect(() => {
        setHeights(stopNameRef.current.map(ref => ref.offsetHeight))
    }, [])


    return (
        <div className='route-stop-container'>
            <div className='route-progress-container'>
                {
                    (!isEqual(heights, [])) && <div className='route-progress-stop-icon-container' style={{height: `${heights.reduce((sum, height) => sum + height, 0)}px`}}>
                    {heights.map((height, index) => <div key={`stop-marker-${index}`}style={{height: `${height}px`}} className='route-progress-stop-icon'><div style={{ backgroundColor:`${busColor[busData.properties.full_name]}` }}></div></div>)}
                    </div>
                }
                {
                    (!isEqual(heights, [])) && <div className='route-progress-bar-container' style={{height: `${(heights.reduce((sum, height) => sum + height + 20, 0) - (heights[0] / 2 + heights[heights.length -1] / 2 + 20))}px`, top: `${(heights[0] / 2) + 20}`}}>
                        <div></div>
                    </div>
                }
            </div>
            <div className='route-stopname-container'>
                {stopDataArray.map((stop, index) => (
                    <div key={index} ref={el => stopNameRef.current[index] = el} className='route-stopnames'>
                        {stop}
                    </div>
                ))}
            </div>
        </div>
    )
    

}

function Route({ route, showRoute, setShowRoute , busData}) {
    const id = route.features[0].properties.route_short_name

    const stopDataArray = route.features[0].properties.route_stops.map(stopData => stopData.stop.stop_name)


    function toggleRoute() {
        setShowRoute(prev => (prev === id ? null : id))
    }

    return (
        <div className='route-container-items'>
            <div className='route-header' onClick={toggleRoute}>
                <div className='route-title'>
                    <div>{route.features[0].properties.route_short_name}</div>
                    <div>({route.features[0].properties.route_long_name})</div>
                </div>
                <div>{showRoute === id ? '-' : '+'}</div>
            </div>
            {showRoute === id && 
                <div className='route-content'>
                    <div className='route-desc'>{route.features[0].properties.route_desc}</div>
                    <StopName stopDataArray={stopDataArray} busData={busData}/>
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
            <Route route={goldRoute} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct Gold1"]}/>
            <hr className='route'/>
            <Route route={greenRoute} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct green"]}/>
            <hr className='route'/>
            <Route route={blueRoute} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct blue1"]}/>
            <hr className='route'/>
            <Route route={brownRoute} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct brown"]}/>
            <hr className='route'/>
            <Route route={redRoute} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct red"]}/>
            <hr className='route'/>
            <Route route={orangeRoute} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct orange"]}/>
            <hr className='route'/>
            <Route route={purpleRoute} showRoute={showRoute} setShowRoute={setShowRoute} busData={busObject["hct purple"]}/>
        </div>
    )
}
