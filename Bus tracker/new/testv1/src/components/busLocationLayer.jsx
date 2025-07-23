import { useEffect, useRef , useState} from 'react'
import { Marker, Popup } from "react-leaflet"
import busDivIcon from './busIcons'
import { capitalizeWords } from '../util/capitalizeWords'
import nextStop from '../model/nextstop'
import isEqual from 'react-fast-compare'

export function fetchBusData(busLoctionUrl, setBusData, prevBusData) {

    useEffect(() => {
        
        async function getBusData(url) {
            const response = await fetch(url)
            const data = await response.json()

            if(!isEqual(prevBusData.current, data)) {

                setBusData(data)
                prevBusData.current = data
            }
        }

        getBusData(busLoctionUrl)

        const interval = setInterval(() => getBusData(busLoctionUrl), 5000)

        return () => clearInterval(interval)
    
    }, [])

}

function BusMarker({busData}) {

    const { geometry, properties } = busData;
    const position = [geometry.coordinates[1], geometry.coordinates[0]];
    const icon = busDivIcon(properties.full_name, properties.course);

    const[ prevBusData, setPrevBusData] = useState(busData)
    const time = useRef("N/A")

    useEffect(() => {
        if (!isEqual(prevBusData, busData)) {
            time.current = new Date().toLocaleTimeString()
            console.log(time.current)
            setPrevBusData(busData)
        }
    }, [busData])

    return (
        <Marker position={position} icon={icon}>
            <Popup>
                <div>
                {capitalizeWords(properties.full_name)} <br/> NextStop: {nextStop(busData)} <br/> Last Known Time: {time.current}
                </div>
            </Popup>
        </Marker>
    )
}

export function BusLocationLayer({data}) {
    
    return (
        <>
            {data.features.map(busData => (
                <BusMarker key={busData.properties.full_name} busData={busData} />
            ))}
        </>

    )

}