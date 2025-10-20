import { useEffect, useRef } from "react"
import L from 'leaflet'
import { useMap } from "react-leaflet"
import blueRoute from '../assets/data/route/r-dj86p-blueline2.geojson.json'
import greenRoute from '../assets/data/route/r-dj86p-greenline2.geojson.json'
import goldRoute from '../assets/data/route/r-dj86pp-goldline2.geojson.json'
import redRoute from '../assets/data/route/r-dj86p-redline2.geojson.json'
import orangeRoute from '../assets/data/route/r-dj86p-orangeline2.geojson.json'
import brownRoute from '../assets/data/route/r-dj86r-brownline2.geojson.json'
import purpleRoute from '../assets/data/route/r-dj8d0-purpleline2.geojson.json'
import BusIcon from '../assets/icons/bus-icon2.png'
import stationTransferStops from '../assets/data/route/stationTransferStop.json'
import isEqual from "react-fast-compare"

function RouteStopLayer({ data, routeColor, searchLayers }) { // Renamed 'color' prop to 'routeColor' for consistency

    const map = useMap()
    const prevZoom = useRef()

    useEffect(() => {
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
            onEachFeature: function (feature, layer) {
                // FIX 1: Set the searchName on the GeoJSON structure first.
                // This is the most reliable way for L.Control.Search to find the value.
                feature.properties.searchName = feature.properties.stopName;
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 3, // Size of the circle marker
                    fillColor: "black",
                    color: "white", // Border color
                    weight: 1,      // Border weight
                    opacity: 1,
                    fillOpacity: 1,
                    searchName: feature.properties.stop_name,
                    title: feature.properties.stop_name
                }).bindPopup(`
                    <div class="route-layer">
                        <span style="display: block; text-align: center; margin-bottom: 5px; font-size: 16px; font-weight: 600;">Regular Stop</span>
                        Location: ${feature.properties.stop_name}
                        <br>
                        Serves: ${data.features[0].properties.route_short_name}
                    </div>
                `)
            }
        }).addTo(map)




        const stationIconHtml = `
            <div style="
                border-radius: 50%;
                background-color: white;
                height: 16px;
                width: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid black;
            ">
                <img src="${BusIcon}" style="
                    width: 70%;
                    height: 70%;
                    object-fit: contain;
                "/>
            </div>   
        `

        const stationIcon = L.divIcon({
            html: stationIconHtml,
            className: "station-icon",
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            popupAnchor: [0, -8]
        })

        const stationTransferLayer = L.geoJSON(stationTransferStops, {
            onEachFeature: function (feature, layer) {
                // FIX 1: Set the searchName on the GeoJSON structure first.
                // This is the most reliable way for L.Control.Search to find the value.
                feature.properties.searchName = feature.properties.stop_name;
            },
            pointToLayer: function (feature, latlng) {

                if (feature.properties.type === "Transfer") {
                    const routeNamesString = feature.properties.routeNames.join(", ")
                    return L.circleMarker(latlng, {
                        radius: 3,
                        fillColor: "white",
                        color: "black",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 1,
                        searchName: feature.properties.stopName,
                        title: feature.properties.stopName
                    }).bindPopup(`
                        <div class="route-layer">
                            <span style="display: block; text-align: center; margin-bottom: 5px; font-size: 16px; font-weight: 600;">Transfer Stop</span>
                            Location: ${feature.properties.stopName}
                            <br>
                            Serves: ${routeNamesString}
                        </div>`
                    )
                } else {
                    const routeNamesString = feature.properties.routeNames.join(", ")
                    return L.marker(latlng, { icon: stationIcon }).bindPopup(`
                        <div class="route-layer">
                            <span style="display: block; text-align: center; margin-bottom: 5px; font-size: 16px; font-weight: 600;">Bus Station</span>
                            Location: ${feature.properties.stopName}
                            <br>
                            Serves: ${routeNamesString}
                        </div>`
                    )
                }
            }
        }).addTo(map)

        if (searchLayers && searchLayers.current) {
            // Corrected layer assignment from previous steps
            searchLayers.current.addLayer(stopLayer)
            searchLayers.current.addLayer(stationTransferLayer)
        } else {
            // Optional: Log a warning if the layer group isn't ready
            console.warn("searchLayers ref is not ready or was not passed correctly.");
        }


        map.on('zoomend', () => {
            const currentZoom = map.getZoom()
            if (!isEqual(prevZoom.current, currentZoom)) {
                if (currentZoom > 17) {
                    stopLayer.eachLayer(function (marker) {
                        marker.setStyle(
                            {
                                radius: 9,
                                weight: 3
                            }
                        )
                    })
                    stationTransferLayer.eachLayer(function (circleMarker) {
                        if (circleMarker.feature.properties.type === "Transfer") {
                            circleMarker.setStyle(
                                {
                                    radius: 9,
                                    weight: 3
                                }
                            )
                        }
                    })
                }
                else if (currentZoom > 14 && currentZoom <= 17) {
                    stopLayer.eachLayer(function (marker) {
                        marker.setStyle(
                            {
                                radius: 6,
                                weight: 2
                            }
                        )
                    })
                    stationTransferLayer.eachLayer(function (circleMarker) {
                        if (circleMarker.feature.properties.type === "Transfer") {
                            circleMarker.setStyle(
                                {
                                    radius: 6,
                                    weight: 2
                                }
                            )
                        }
                    })
                }
                else if (currentZoom <= 14) {
                    stopLayer.eachLayer(function (marker) {
                        marker.setStyle(
                            {
                                radius: 3,
                                weight: 1
                            }
                        )
                    })
                    stationTransferLayer.eachLayer(function (circleMarker) {
                        if (circleMarker.feature.properties.type === "Transfer") {
                            circleMarker.setStyle(
                                {
                                    radius: 3,
                                    weight: 1
                                }
                            )
                        }
                    })
                }

                prevZoom.current = currentZoom
            }
        })

        return () => {
            map.removeLayer(routeLayer)
            map.removeLayer(stopLayer)
            map.removeLayer(stationTransferLayer)
        }
    }, [data, routeColor, map])

}

export default function BusRouteStopLayer({ searchLayers }) { // 👈 FIX: Accept searchLayers as a prop
    return (
        <>
            <RouteStopLayer searchLayers={searchLayers} data={greenRoute} routeColor={"hsl(112, 63%, 52%)"} />
            <RouteStopLayer searchLayers={searchLayers} data={goldRoute} routeColor={"hsl(44, 96%, 59%)"} />
            <RouteStopLayer searchLayers={searchLayers} data={blueRoute} routeColor={"hsl(200, 100%, 50%)"} />
            <RouteStopLayer searchLayers={searchLayers} data={redRoute} routeColor={"hsl(12, 82%, 50%)"} />
            <RouteStopLayer searchLayers={searchLayers} data={orangeRoute} routeColor={"hsl(27, 100%, 50%)"} />
            <RouteStopLayer searchLayers={searchLayers} data={redRoute} routeColor={"hsl(12, 82%, 50%)"} />
            <RouteStopLayer searchLayers={searchLayers} data={brownRoute} routeColor={"hsl(17, 74%, 37%)"} />
            <RouteStopLayer searchLayers={searchLayers} data={purpleRoute} routeColor={"hsl(250, 100%, 77%)"} />
        </>
    )
}