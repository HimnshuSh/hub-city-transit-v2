import L from 'leaflet'
import { AttributionControl, MapContainer } from 'react-leaflet'
import { useRef, useState } from 'react'
import { fetchBusData, BusLocationLayer } from './busLocationLayer'
import BusRouteStopLayer from './routes'
import BottomBar from "./bottombar"
import 'leaflet/dist/leaflet.css'

import TileLayer from './tileLayer'
import LocationMarker from './locationMarker'
import '../App.css'

export default function Map() {
    const position = [31.3114517, -89.3176855] // [latitude, longitude]
    const bound = [[31.2114517, -89.4176855], [31.4114517, -89.2176855]]
    const busLoctionUrl = "https://bus-tracker-backend-nc6f.onrender.com"

    const [busData, setBusData] = useState(null)
    const prevBusData = useRef(null)

    fetchBusData(busLoctionUrl, setBusData, prevBusData)
    const searchLayers = useRef(L.layerGroup())
    return (
        <>
            <div className='map-container'>
                <MapContainer
                    maxBounds={bound}
                    minZoom={11}
                    maxZoom={18}
                    center={position}
                    zoom={11.5}
                    style={{ height: '100%', width: '100%' }}
                    attributionControl={false}
                >
                    <TileLayer />
                    <LocationMarker />
                    <BusRouteStopLayer searchLayers={searchLayers} />
                    {busData && <BusLocationLayer data={busData} searchLayers={searchLayers} />}
                    <BottomBar busData={busData} searchLayers={searchLayers} />
                    <AttributionControl
                        position="topright"
                        prefix={`<a href="https://leafletjs.com" title="A JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a> <span aria-hidden="true">|</span> <a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> <br> <a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`}
                    />
                </MapContainer>
            </div>
        </>
    )
}