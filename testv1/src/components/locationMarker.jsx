import { LocateControl } from "leaflet.locatecontrol"
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"
import { Marker, useMap } from "react-leaflet"
import { useEffect } from "react"
import { circleMarker } from "leaflet"

export default function LocationMarker() {
    const map = useMap()

    useEffect(() => {
        // This line is where the error occurs, so fixing the import ensures L.control.locate exists
        const locationControl = new LocateControl({
            flyTo: true,
            showCompass: true,
            markerClass: circleMarker,
            markerStyle: {
                radius: 8,
                weight: 2,
            },
            enableHighAccuracy: true
        }).addTo(map)

        return () => {
            map.removeControl(locationControl)
        }
    }, [map])

    return null
}
