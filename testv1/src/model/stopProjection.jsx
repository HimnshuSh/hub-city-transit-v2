import { nearestPointOnLine } from "@turf/nearest-point-on-line"

export default function projectStopToRoute(route) {

    const stopGeoJsonData = route.features[0].properties.route_stops.map(stopData => ({
        type: "Feature",
        geometry: stopData.stop.geometry,
        properties: {
            id: stopData.stop.id,
            stop_id: stopData.stop.stop_id,
            stop_name: stopData.stop.stop_name
        }
    }))

    const stopCal = stopGeoJsonData.map(
        stop => {
            const stopPoint = nearestPointOnLine(route, stop.geometry.coordinates, { units: "miles" })

            return {
                stopName: stop.properties.stop_name,
                stopId: stop.properties.stop_id,
                coordinates: stop.geometry.coordinates,
                distance: stopPoint.properties.location
            }
        }
    )

    return stopCal
}