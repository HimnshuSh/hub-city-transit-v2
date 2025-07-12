import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet'; // Added Marker and Popup

export default function Map() {
    
    return  (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )

}