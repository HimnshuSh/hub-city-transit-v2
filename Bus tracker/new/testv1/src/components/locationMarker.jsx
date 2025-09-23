import { useState } from "react"
import { CircleMarker, Popup, useMap } from "react-leaflet"

export default function LocationMarker() {
    const [userPosition, setUserPosition] = useState(null)
    const map = useMap()

    function getlocation() {
        map.locate().on('locationfound', function (e) {
            map.flyTo(e.latlng, 15)
            setUserPosition(e.latlng)
        }).on('locationerror', function (e) {
            alert(e.message)
        })
    }

    return (
        <>
            <button
                onClick={getlocation}
                className="gps-button"
                style={{
                    position: 'absolute',
                    top: '100px',
                    left: '10px',
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    boxShadow: '0px 3px 4px #00000030',
                    border: 'none',
                    backgroundColor: 'hsl(228, 33%, 97%)',
                    zIndex: 1000
                }}>
            </button>

            {
                userPosition === null ? null : <CircleMarker
                    center={userPosition}
                    radius={8}
                    pathOptions={{
                        color: 'black',
                        fillColor: 'hsl(228, 33%, 97%)',
                        fillOpacity: 1,
                        weight: 2,
                        opacity: 1
                    }}
                >
                    <Popup>You are here</Popup>
                </CircleMarker>
            }
        </>
    )
}