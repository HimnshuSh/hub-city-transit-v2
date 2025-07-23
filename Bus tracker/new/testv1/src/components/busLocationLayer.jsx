import { useEffect } from 'react'
import L from 'leaflet'
import { useMap } from "react-leaflet"
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

export function BusLocationLayer({data}) {
    
    const map = useMap() // Get the map instance using useMap hook
    useEffect(() => {
        const geoJsonLayer = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
            const busIcon = busDivIcon(feature.properties.full_name, feature.properties.course)
            return L.marker(latlng, {icon: busIcon}).bindPopup(`<div>${capitalizeWords(feature.properties.full_name)} <br/> NextStop: ${nextStop(feature)}</div>`)
            }
        }).addTo(map)

        return () => {
            map.removeLayer(geoJsonLayer)
        }
    }, [data])

    return null

}