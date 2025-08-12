import { lineString, point } from "@turf/helpers"
import getRouteForBus from "../util/getRouteForBus"
import nearestPointOnLine from "@turf/nearest-point-on-line"
import lineSlice from "@turf/line-slice"

function getRouteSegment(busData, stopData) {
    
    const route = getRouteForBus(busData.properties.full_name)
    const routeLineString = lineString(route.features[0].geometry.coordinates[0])

    const busLocation = point(busData.geometry.coordinates)
    const stopLocation = point(stopData.coordinates)
    
    const busLocationOnRoute = nearestPointOnLine(routeLineString, busLocation.geometry.coordinates, {units: "miles"})
    const stopLocationOnRoute = nearestPointOnLine(routeLineString, stopLocation.geometry.coordinates, {units: "miles"})

    const routeSegment = lineSlice(busLocationOnRoute, stopLocationOnRoute, routeLineString)

    const formatedRouteSegment = routeSegment.geometry.coordinates.map((wayPoints, index, arr) => {
        if (!((index + 1) === arr.length)) {
            return `${wayPoints[1]},${wayPoints[0]}:`
        }
        else
            return `${wayPoints[1]},${wayPoints[0]}`
    })

    return formatedRouteSegment.join('')
}

export default async function etaForNextStop(busData, stopData) {
    
    const routeSegment = getRouteSegment(busData, stopData)

    const apiKey = import.meta.env.VITE_TOMTOM_API_KEY

    const reponse = await fetch(`https://api.tomtom.com/routing/1/calculateRoute/${routeSegment}/json?key=${apiKey}&traffic=true`)
    const tomtomData = await reponse.json()
    const time = await tomtomData.routes[0].summary.travelTimeInSeconds
    
    return time
}