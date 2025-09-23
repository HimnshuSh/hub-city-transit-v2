import { useMap } from 'react-leaflet'
import L from 'leaflet'
import '@maplibre/maplibre-gl-leaflet'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect } from 'react'

export default function TileLayer() {
    const map = useMap()

    useEffect(() => {
        const maplibreLayer = L.maplibreGL({
            style: 'https://tiles.openfreemap.org/styles/bright',
            attributionControl: false
        })
        maplibreLayer.addTo(map)

        return () => {
            map.removeLayer(maplibreLayer)
        }
    }, [map])

    return null
}