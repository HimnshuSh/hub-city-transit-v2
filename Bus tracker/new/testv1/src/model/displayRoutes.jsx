import blueRoute from '../assets/data/route/r-dj86p-blueline2.geojson.json'
import greenRoute from '../assets/data/route/r-dj86p-greenline2.geojson.json'
import goldRoute from '../assets/data/route/r-dj86pp-goldline2.geojson.json'
import redRoute from '../assets/data/route/r-dj86p-redline2.geojson.json'
import orangeRoute from '../assets/data/route/r-dj86p-orangeline2.geojson.json'
import brownRoute from '../assets/data/route/r-dj86r-brownline2.geojson.json'
import purpleRoute from '../assets/data/route/r-dj8d0-purpleline2.geojson.json'
import { useState } from 'react'

function Route({ route, showRoute, setShowRoute }) {
    const id = route.features[0].properties.route_short_name

    const stopDataArray = route.features[0].properties.route_stops.map(stopData => stopData.stop.stop_name)
    console.log(stopDataArray)


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
                    <div>{route.features[0].properties.route_desc}</div>
                    {stopDataArray.map(stop => <div>{stop}</div>)}
                </div>}
        </div>
    )
}

export default function DisplayRoutes({ busData }) {
    const [showRoute, setShowRoute] = useState(null)

    return (
        <div className='route-container'>
            <Route route={goldRoute} showRoute={showRoute} setShowRoute={setShowRoute} />
            <hr className='route'/>
            <Route route={greenRoute} showRoute={showRoute} setShowRoute={setShowRoute} />
            <hr className='route'/>
            <Route route={blueRoute} showRoute={showRoute} setShowRoute={setShowRoute} />
            <hr className='route'/>
            <Route route={brownRoute} showRoute={showRoute} setShowRoute={setShowRoute} />
            <hr className='route'/>
            <Route route={redRoute} showRoute={showRoute} setShowRoute={setShowRoute} />
            <hr className='route'/>
            <Route route={orangeRoute} showRoute={showRoute} setShowRoute={setShowRoute} />
            <hr className='route'/>
            <Route route={purpleRoute} showRoute={showRoute} setShowRoute={setShowRoute} />
        </div>
    )
}
