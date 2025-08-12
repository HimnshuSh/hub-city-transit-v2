import { nearestPointOnLine } from "@turf/nearest-point-on-line"
import getRouteForBus from "../util/getRouteForBus"
import projectStopToRoute from "./stopProjection"

export default function getNextStop(busData, busDistance) {
    
    const route = getRouteForBus(busData.properties.full_name)
    const location = nearestPointOnLine(route, busData.geometry.coordinates, {units: "miles"})


    if (location.properties.dist > 0.1) {
        return {
            stopName: "N/A",
            stopId: null,
            coordinates: null,
            distance: null
        }
    }
    const stopDistance = projectStopToRoute(route) //returns array containing stops projected onto route with distance, name & coordinates

    for (stop of stopDistance) {
        if (location.properties.location < stop.distance) {
            if (busDistance) {
                return { ...stop, busDistance: location.properties.location}
            }
            else {
                return stop
            }
        }
    }

    return stopDistance[0] //cannot find the array it occurs when the bus moves just past the last stop
}