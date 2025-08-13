import { AttributionControl, MapContainer, ZoomControl } from 'react-leaflet'
import { useRef, useState } from 'react'
import { fetchBusData, BusLocationLayer } from './busLocationLayer'
import BusRouteStopLayer from './routes'
import BottomBar from "./bottombar"
import 'leaflet/dist/leaflet.css'
import '../App.css'
import TileLayer from './tileLayer'

export default function Map()
{
    const position = [31.3114517, -89.3176855] // [latitude, longitude]
    const bound = [[31.2114517, -89.4176855], [31.4114517, -89.2176855]]
    const busLoctionUrl = "https://utility.arcgis.com/usrsvcs/servers/b02066689d504f5f9428029f7268e060/rest/services/Hosted/8bd5047cc5bf4195887cc5237cf0d3e0_Track_View/FeatureServer/1/query?f=geojson&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry={%22xmin%22:-9952239.718110478,%22ymin%22:3657331.85371723454,%22xmax%22:-9933358.86251328,%22ymax%22:3679195.0687008603,%22spatialReference%22:{%22wkid%22:102100}}&geometryType=esriGeometryEnvelope&inSR=102100&outFields=location_timestamp,course,full_name,speed&returnCentroid=false&returnExceededLimitFeatures=false&outSR=4326"

    const [busData, setBusData] = useState(null)
    const prevBusData = useRef(null)

    fetchBusData(busLoctionUrl, setBusData, prevBusData)

    return (
        <>
            <div className='map-container'>
                <MapContainer
                    maxBounds={bound}
                    minZoom={12}
                    center={position}
                    zoom={11.5}
                    style={{ height: '100%', width: '100%' }}
                    attributionControl={true}
                >
                    <TileLayer />
                    <BusRouteStopLayer />
                    {busData && <BusLocationLayer data={busData} />}
                    <BottomBar busData={busData} />
                    <AttributionControl
                        position="topright"
                    />
                </MapContainer>
            </div>
        </>
    )
}