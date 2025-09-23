import L from 'leaflet'

import BusIcon from '../assets/icons/bus-icon2.png'

export const busColor = {
    "hct blue2": "hsl(200, 100%, 50%)",
    "hct blue1": "hsl(200, 100%, 50%)",
    "hct gold2": "hsl(44, 96%, 59%)",
    "hct Gold1": "hsl(44, 96%, 59%)",
    "hct green": "hsl(112, 63%, 52%)",
    "hct brown": "hsl(17, 74%, 37%)",
    "hct purple": "hsl(250, 100%, 77%)",
    "hct red": "hsl(12, 82%, 50%)",
    "hct orange": "hsl(27, 100%, 50%)"
}

const busDivIcon = (busType, course) => {

    const backgroundColor = busColor[busType]

    const customHtml = `
        <div style="
            background-color: ${backgroundColor};
            border-radius: 0 50% 50%;
            height: 25px;
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 3px -3px 3px #00000045;
            transform: rotate(45deg) rotate(${course}deg);
        ">
            <img src="${BusIcon}" style="
                width: 70%;
                height: 70%;
                object-fit: contain;
                position: absolute;
                transform: rotate(-45deg) rotate(${-course}deg);
            "/>
        </div>
    `

    return L.divIcon({
        html: customHtml,
        className: 'custom-bus-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    })
}

export default busDivIcon