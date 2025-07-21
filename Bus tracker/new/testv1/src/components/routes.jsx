import { useEffect } from "react"
import L from 'leaflet'
import { useMap } from "react-leaflet"
import blueRoute from '../assets/data/route/r-dj86p-blueline2.geojson.json'
import greenRoute from '../assets/data/route/r-dj86p-greenline2.geojson.json'
import goldRoute from '../assets/data/route/r-dj86pp-goldline2.geojson.json'
import redRoute from '../assets/data/route/r-dj86p-redline2.geojson.json'
import orangeRoute from '../assets/data/route/r-dj86p-orangeline2.geojson.json'
import brownRoute from '../assets/data/route/r-dj86r-brownline2.geojson.json'
import purpleRoute from '../assets/data/route/r-dj8d0-purpleline2.geojson.json'

import stopProject from '../model/stopProjection'



function RouteStopLayer ({data, routeColor}) { // Renamed 'color' prop to 'routeColor' for consistency

    const map = useMap()

    useEffect(()=> {
        const routeLayer = L.geoJSON(data, {
            style: function (feature) {
            return {
                color: routeColor,
                weight: 3.3,
                opacity: 1
                }
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`<div>Route: ${feature.properties.route_short_name} (${feature.properties.route_long_name})<br/>${feature.properties.route_desc}</div>`)
            }
        }).addTo(map)

        const stopGeoJsonData = data.features[0].properties.route_stops.map(stopData => ({
            type: "Feature",
            geometry: stopData.stop.geometry,
            properties: {
                id: stopData.stop.id,
                stop_id: stopData.stop.stop_id,
                stop_name: stopData.stop.stop_name
            }
        }))

        const stopFeatureCollection = {
            type: "FeatureCollection",
            features: stopGeoJsonData
        }

        const stopLayer = L.geoJSON(stopFeatureCollection, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, // Size of the circle marker
                    fillColor: "black",
                    color: "white", // Border color
                    weight: 1,      // Border weight
                    opacity: 1,
                    fillOpacity: 0.7
                }).bindPopup(`<div class="route-layer">Location: ${feature.properties.stop_name}</div>`)
            }
        }).addTo(map)

        return () => {
            map.removeLayer(routeLayer)
            map.removeLayer(stopLayer)
        }
    }, [data, routeColor, map])

}

export default function BusRouteStopLayer() {
    return (
        <>
            <RouteStopLayer data={greenRoute} routeColor={"hsl(112, 63%, 52%)"}/>
            <RouteStopLayer data={goldRoute} routeColor={"hsl(44, 96%, 59%)"}/>
            <RouteStopLayer data={blueRoute} routeColor={"hsl(200, 100%, 50%)"}/>
            <RouteStopLayer data={redRoute} routeColor={"hsl(12, 82%, 50%)"}/>
            <RouteStopLayer data={orangeRoute} routeColor={"hsl(27, 100%, 50%)"}/>
            <RouteStopLayer data={redRoute} routeColor={"hsl(12, 82%, 50%)"}/>
            <RouteStopLayer data={brownRoute} routeColor={"hsl(17, 74%, 37%)"}/>
            <RouteStopLayer data={purpleRoute} routeColor={"hsl(250, 100%, 77%)"}/>
        </>
    )
}