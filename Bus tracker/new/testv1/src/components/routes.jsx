import { useEffect } from "react"
import L from 'leaflet'
import { useMap } from "react-leaflet"
import blueRoute from '../assets/data/route/r-dj86p-blueline.geojson.json'
import greenRoute from '../assets/data/route/r-dj86p-greenline.geojson.json'
import goldRoute from '../assets/data/route/r-dj86pp-goldline.geojson.json'
import redRoute from '../assets/data/route/r-dj86p-redline.geojson.json'
import orangeRoute from '../assets/data/route/r-dj86p-orangeline.geojson.json'
import brownRoute from '../assets/data/route/r-dj86r-brownline.geojson.json'
import purpleRoute from '../assets/data/route/r-dj8d0-purpleline.geojson.json'


function RouteStopLayer ({data, routeColor}) { // Renamed 'color' prop to 'routeColor' for consistency

    const map = useMap()

    useEffect(()=> {
        const routeLayer = L.geoJSON(data, {
            style: function () {
            return {
                color: routeColor,
                weight: 3.3,
                opacity: 1
                }
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
                    radius: 3.3, // Size of the circle marker
                    fillColor: "black",
                    color: "white", // Border color
                    weight: 1,      // Border weight
                    opacity: 1,
                    fillOpacity: 0.7
                })
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
            <RouteStopLayer data={blueRoute} routeColor={"hsl(200, 100%, 50%)"}/>
            <RouteStopLayer data={greenRoute} routeColor={"hsl(112, 63%, 52%)"}/>
            <RouteStopLayer data={goldRoute} routeColor={"hsl(44, 96%, 59%)"}/>
            <RouteStopLayer data={redRoute} routeColor={"hsl(12, 82%, 50%)"}/>
            <RouteStopLayer data={orangeRoute} routeColor={"hsl(27, 100%, 50%)"}/>
            <RouteStopLayer data={brownRoute} routeColor={"hsl(17, 74%, 37%)"}/>
            <RouteStopLayer data={purpleRoute} routeColor={"hsl(250, 100%, 77%)"}/>
        </>
    )
}