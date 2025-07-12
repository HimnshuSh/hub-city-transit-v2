import Buttons from './buttons'
import '../App.css'

import displaySchedule from "../model/displaySchedule"
import displayRoutes from "../model/displayRoutes"
import displaySearch from "../model/displaySearch"
import displayFare from "../model/displayFare"
import displayLegend from "../model/displayLegend"
import { useState } from 'react'

export default function BottomBar() {

    const [conditionalRendering, setConditionalRendering] = useState(false)

    const buttonArray = [
        {
            name: "Schedule",
            icon: 'src/assets/icons/schedule-icon2.png',
            func: () => {displaySchedule(setConditionalRendering)},
            height: "30px"
        },
        {
            name: "Routes",
            icon: 'src/assets/icons/route-icon.png',
            func: () => {displayRoutes()},
            height: "30px"
        },
        {
            name: "Search",
            icon: 'src/assets/icons/search-icon2.png',
            func: () => {displaySearch()},
            height: "30px"
        },
        {
            name: "Fare",
            icon: 'src/assets/icons/fare-icon.png',
            func: () => {displayFare()},
            height: "30px"
        },
        {
            name: "Legend",
            icon: 'src/assets/icons/legend-icon.png',
            func: () => {displayLegend()},
            height: "30px"
        }
    ]
    
    return (
        <>
            {conditionalRendering && <div classs="function-box">Hello</div>}
            <div className='bottom-bar'>
                {buttonArray.map(type => <Buttons key={type.name} prop={type}/>)}
            </div>
        </>
    )
}