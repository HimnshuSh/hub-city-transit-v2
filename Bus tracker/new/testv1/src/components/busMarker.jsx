import { useState, useEffect, useRef } from "react"
import { Marker, Popup } from "react-leaflet"
import busDivIcon, {busColor} from './busIcons'
import { capitalizeWords } from '../util/capitalizeWords'
import getNextStop from '../model/nextstop'
import etaForNextStop from '../model/etaForNextStop'
import isEqual from "react-fast-compare"

export default function BusMarker({busData}) {

    const { geometry, properties } = busData;
    const position = [geometry.coordinates[1], geometry.coordinates[0]];
    const icon = busDivIcon(properties.full_name, properties.course);

    const prevBusData = useRef(busData)
    const [lastKnownTime, setLastKnownTime] = useState("N/A")

    const [open, setOpen] = useState(false)
    const prevTime = useRef(lastKnownTime)
    const [EtaTime, setEtaTime] = useState("ETA: N/A")

    const stopData = getNextStop(busData)
    const color = busColor[properties.full_name]

    useEffect(() => {
        if (!isEqual(prevBusData.current, busData)) {
            console.log("new data for " + busData.properties.full_name + `At ${new Date().toLocaleTimeString()}`)
            setLastKnownTime(new Date())
            prevBusData.current = busData
        }
    }, [busData, lastKnownTime, prevBusData.current]) 

    useEffect(() => {
        if (!isEqual(prevTime.current, lastKnownTime)) {
            if ((stopData.stopName !== "N/A") && (lastKnownTime !== "N/A") && open) {
                etaForNextStop(busData, stopData)
                    .then(sec => {
                    const etaTime = new Date(lastKnownTime.getTime())
                    etaTime.setSeconds(etaTime.getSeconds() + sec)

                    console.log("calling eta fetch for: ", busData.properties.full_name)
                    
                    setEtaTime(`ETA: ${etaTime.toLocaleTimeString()}`)
                    prevTime.current = lastKnownTime
                    }
                )
            }
        }
    }, [busData, lastKnownTime, open])

    return (
        <Marker position={position} icon={icon} eventHandlers={
            {popupopen: () => {setOpen(true)}, popupclose: () => {setOpen(false)}}}>
            <Popup className='popup'>
                <div className='popup-container'>
                    <div className='bus-marker-popup-name' style={{color: color}}>
                    {capitalizeWords(properties.full_name)}
                    </div>
                    NextStop: {(stopData.stopName === "N/A") ? "N/A" : stopData.stopName}
                    <br/>
                    Last Known Time: {lastKnownTime === "N/A" ? "N/A" : lastKnownTime.toLocaleTimeString()}
                    <br/>
                    {EtaTime}
                </div>
            </Popup>
        </Marker>
    )
}