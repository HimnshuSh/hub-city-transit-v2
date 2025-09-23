import { useEffect } from 'react'
import isEqual from 'react-fast-compare'
import BusMarker from './busMarker'

export function fetchBusData(busLoctionUrl, setBusData, prevBusData) {

    useEffect(() => {
        async function getBusData(url) {
            const response = await fetch(url)
            const data = await response.json()

            if (!isEqual(prevBusData.current, data)) {
                setBusData(data)
                prevBusData.current = data
            }

        }

        getBusData(busLoctionUrl)

        const interval = setInterval(() => getBusData(busLoctionUrl), 5000)

        return () => clearInterval(interval)
    }, [])

}

export function BusLocationLayer({ data }) {

    return (
        <>
            {data.features.map(busData => (
                <BusMarker key={busData.properties.full_name} busData={busData} />
            ))}
        </>

    )

}