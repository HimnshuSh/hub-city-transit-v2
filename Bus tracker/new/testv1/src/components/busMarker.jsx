import { useState, useEffect, useRef } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import busDivIcon, { busColor } from './busIcons'
import { capitalizeWords } from '../util/capitalizeWords'
import getNextStop from '../model/nextstop'
import etaForNextStop from '../model/etaForNextStop'
import isEqual from "react-fast-compare"
import L from 'leaflet'

export default function BusMarker({ busData }) {
    const { geometry, properties } = busData
    const position = [geometry.coordinates[1], geometry.coordinates[0]]
    const icon = busDivIcon(properties.full_name, properties.course)
    const map = useMap()

    const prevBusData = useRef(busData)
    const [lastKnownTime, setLastKnownTime] = useState("N/A")

    const [open, setOpen] = useState(false)
    const prevTime = useRef(lastKnownTime)
    const [EtaTime, setEtaTime] = useState("ETA: N/A")

    const stopData = getNextStop(busData)
    const color = busColor[properties.full_name]

    useEffect(() => {
        if (!isEqual(prevBusData.current, busData)) {
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
                        console.log(etaTime.toLocaleTimeString())
                        const test = new Date(busData.properties.location_timestamp)
                        console.log(test.toLocaleTimeString())

                        etaTime.setSeconds(etaTime.getSeconds() + sec)

                        setEtaTime(`ETA: ${etaTime.toLocaleTimeString()}`)
                        prevTime.current = lastKnownTime
                    }
                    )
            }
        }
    }, [busData, lastKnownTime, open])

    const handleNextStopClick = () => {
        if (stopData.stopName !== "N/A") {
            const stopCoordinates = [stopData.coordinates[1] - 0.0007, stopData.coordinates[0]]
            if (stopCoordinates) {

                map.flyTo(stopCoordinates, 18)

                map.eachLayer(layer => {
                    if (layer instanceof L.CircleMarker && layer.feature.properties.stop_id === stopData.stopId) {
                        setTimeout(() => layer.openPopup(), 500)
                    }
                })
            }
        }
    }

    return (
        <Marker position={position} icon={icon} eventHandlers={
            { popupopen: () => { setOpen(true) }, popupclose: () => { setOpen(false) } }}>
            <Popup className='popup'>
                <div className='popup-container'>
                    <div className='bus-marker-popup-name' style={{ color: color }}>
                        {capitalizeWords(properties.full_name)}
                    </div>
                    Next Stop: <span className="next-stop-link" style={{ cursor: "pointer" }} onClick={handleNextStopClick}>
                        {(stopData.stopName === "N/A") ? "N/A" : stopData.stopName}
                    </span>
                    <br />
                    Last Known Time: {lastKnownTime === "N/A" ? "N/A" : lastKnownTime.toLocaleTimeString()}
                    <br />
                    {EtaTime}
                </div>
            </Popup>
        </Marker>
    )
}