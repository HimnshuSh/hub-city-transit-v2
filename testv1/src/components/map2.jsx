import { AttributionControl, MapContainer, ZoomControl } from 'react-leaflet'
import { useRef, useState } from 'react'
import { fetchBusData, BusLocationLayer } from './busLocationLayer'
import BusRouteStopLayer from './routes'
import BottomBar from "./bottombar"
import 'leaflet/dist/leaflet.css'
import '../App.css'
import TileLayer from './tileLayer'
import LocationMarker from './locationMarker'

export default function Map() {
    const position = [31.3114517, -89.3176855] // [latitude, longitude]
    const bound = [[31.2114517, -89.4176855], [31.4114517, -89.2176855]]
    const busLoctionUrl = "https://utility.arcgis.com/usrsvcs/servers/b02066689d504f5f9428029f7268e060/rest/services/Hosted/8bd5047cc5bf4195887cc5237cf0d3e0_Track_View/FeatureServer/1/query?f=geojson&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry={%22xmin%22:-9952239.718110478,%22ymin%22:3657331.85371723454,%22xmax%22:-9933358.86251328,%22ymax%22:3679195.0687008603,%22spatialReference%22:{%22wkid%22:102100}}&geometryType=esriGeometryEnvelope&inSR=102100&outFields=location_timestamp,course,full_name,speed,location_timestamp&returnCentroid=false&returnExceededLimitFeatures=false&outSR=4326"

    const [busData, setBusData] = useState(null)
    const prevBusData = useRef(null)

    fetchBusData(busLoctionUrl, setBusData, prevBusData)

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
                    <BusRouteStopLayer />
                    {busData && <BusLocationLayer data={busData} />}
                    <BottomBar busData={busData} />
                    <AttributionControl
                        position="topright"
                        prefix={`<a href="https://leafletjs.com" title="A JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a> <span aria-hidden="true">|</span> <a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> <br> <a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`}
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
        </>
    )
}