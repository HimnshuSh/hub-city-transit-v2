import Buttons from './buttons'
import '../App.css'

import displaySchedule from "../model/displaySchedule"
import displayRoutes from "../model/displayRoutes"
import displaySearch from "../model/displaySearch"
import displayFare from "../model/displayFare"
import displayLegend from "../model/displayLegend"
import { useState, useEffect } from 'react'

export default function BottomBar() {

    const [conditionalRendering, setConditionalRendering] = useState(false)

    const [isFunctionBoxVisible, setIsFunctionBoxVisible] = useState(false);

    // useEffect to trigger the animation when conditionalRendering becomes true
    useEffect(() => {
        if (conditionalRendering) {
            // When the function-box is about to be rendered (or is already rendered and conditionalRendering is true)
            // set the animation class after a short delay.
            // This delay is crucial: it allows the browser to apply the initial CSS state (opacity: 0, bottom: 20px)
            // before the 'is-visible' class is added, triggering the transition.
            const timer = setTimeout(() => {
                setIsFunctionBoxVisible(true);
            }, 100); // A small delay (e.g., 10ms-100ms) is often sufficient

            // Cleanup the timer if the component unmounts or conditionalRendering changes before the timer fires
            return () => clearTimeout(timer);
        } else {
            // If conditionalRendering becomes false, immediately remove the animation class.
            // Note: This will make the box disappear abruptly. If you want an exit animation,
            // you'd need more complex logic (e.g., using `react-transition-group` or
            // listening for `transitionend` before unmounting the element).
            const timer = setTimeout(() => {
                setIsFunctionBoxVisible(false);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [conditionalRendering]);

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
            {conditionalRendering && (
                <div className={`function-box ${isFunctionBoxVisible ? 'is-visible' : 'is-invisible'}`}>
                    hi
                </div>
            )}
            <div className='bottom-bar'>
                {buttonArray.map(type => <Buttons key={type.name} prop={type}/>)}
            </div>
        </>
    )
}