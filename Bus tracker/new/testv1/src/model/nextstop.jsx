import { nearestPointOnLine } from "@turf/nearest-point-on-line"
import getRouteForBus from "../util/getRouteForBus"
import stopDistanceArray from "./stopProjection"

export default function nextStop(busData) {
    
    const route = getRouteForBus(busData.properties.full_name)
    const location = nearestPointOnLine(route, busData.geometry.coordinates, {units: "miles"})
    if (location.properties.dist > 0.5) {
        return "N/A"
    }
    const stopDistance = stopDistanceArray(route)

    for (stop of stopDistance) {
        if (stop.distance > location.properties.location)
            return stop.stopName
    }
}