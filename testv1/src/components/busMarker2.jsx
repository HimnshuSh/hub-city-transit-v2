import { useEffect, useRef, useState } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import busDivIcon, { busColor } from './busIcons'
import { capitalizeWords } from '../util/capitalizeWords'
import getNextStop from '../model/nextstop'
import L from 'leaflet'

export default function BusMarker({ busData, searchLayers }) {
    const { geometry, properties } = busData
    const position = [geometry.coordinates[1], geometry.coordinates[0]]
    const icon = busDivIcon(properties.full_name, properties.course)
    const map = useMap()

    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }

    const lastKnownTime = new Date(properties.location_timestamp)
    let etaTimeString = 'N/A';
    if (properties.eta !== null) {

        const etaTimeCalculated = new Date(lastKnownTime.getTime());
        etaTimeCalculated.setSeconds(etaTimeCalculated.getSeconds() + properties.eta);
        etaTimeString = etaTimeCalculated.toLocaleTimeString('en-US', timeOptions);
    }

    const stopData = getNextStop(busData)
    const color = busColor[properties.full_name]

    const busMarkerLayerRef = useRef(null)

    useEffect(() => {
        if (searchLayers && searchLayers.current) {
            // Corrected layer assignment from previous steps
            searchLayers.current.addLayer(busMarkerLayerRef.current)
        } else {
            // Optional: Log a warning if the layer group isn't ready
            console.warn("searchLayers ref is not ready or was not passed correctly.");
        }
    }, [busData, open])

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
        <Marker
            position={position}
            icon={icon}
            searchName={capitalizeWords(properties.full_name)}
            ref={busMarkerLayerRef}
        >
            <Popup className='popup'>
                <div className='popup-container'>
                    <div className='bus-marker-popup-name' style={{ color: color }}>
                        {capitalizeWords(properties.full_name)}
                    </div>
                    Next Stop: <span className="next-stop-link" style={{ cursor: "pointer" }} onClick={handleNextStopClick}>
                        {(stopData.stopName === "N/A") ? "N/A" : stopData.stopName}
                    </span>
                    <br />
                    Last Known Time: {lastKnownTime.toLocaleTimeString('en-US', timeOptions)}
                    <br />
                    ETA: {etaTimeString}
                </div>
            </Popup>
        </Marker>
    )
}