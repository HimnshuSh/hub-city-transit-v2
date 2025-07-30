import { useEffect} from 'react'
import isEqual from 'react-fast-compare'
import BusMarker from './busMarker'

export function fetchBusData(busLoctionUrl, setBusData, prevBusData) {
    
    useEffect(() => {
        async function getBusData(url) {
            console.log("Getting data")
            const response = await fetch(url)
            const data = await response.json()

            if(!isEqual(prevBusData.current, data)) {
                console.log("New Data Arrived")
                setBusData(data)
                prevBusData.current = data
            }
            else {
                console.log("Same Data")
            }
        }

        getBusData(busLoctionUrl)

        const interval = setInterval(() => getBusData(busLoctionUrl), 5000)

        return () => clearInterval(interval)
    }, [])

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