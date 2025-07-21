import { useState } from 'react'
import ButtonComponent from './button'
import '../App.css'

import displaySchedule from '../model/displaySchedule'
import displayRoutes from '../model/displayRoutes'
import displaySearch from '../model/displaySearch'
import displayFare from '../model/displayFare'
import displayLegend from '../model/displayLegend'

export default function BottomBar() {

    const [activeButton, setActiveButton] = useState(null)

    const buttonArray = [
        {
            name: 'Schedule',
            icon: 'src/assets/icons/schedule-icon2.png',
            func: displaySchedule,
            height: '30px',
        },
        {
            name: 'Routes',
            icon: 'src/assets/icons/route-icon.png',
            func: displayRoutes,
            height: '30px',
        },
        {
            name: 'Search',
            icon: 'src/assets/icons/search-icon2.png',
            func: displaySearch,
            height: '30px',
        },
        {
            name: 'Fare',
            icon: 'src/assets/icons/fare-icon.png',
            func: displayFare,
            height: '30px',
        },
        {
            name: 'Legend',
            icon: 'src/assets/icons/legend-icon.png',
            func: displayLegend,
            height: '30px',
        },
    ]

    const handleButtonClick = (buttonName) => {
        setActiveButton(prevActiveButton =>
            prevActiveButton === buttonName ? null : buttonName
        )
    }

    return (
        <>
            <div className='bottom-bar'>
                {buttonArray.map(type => (
                    <ButtonComponent
                        key={type.name}
                        prop={type}
                        isActive={activeButton === type.name}
                        onClick={() => handleButtonClick(type.name)}
                    />
                ))}
            </div>
            {activeButton && (
                <div className={`function-box`}>
                    {buttonArray.find(button => button.name === activeButton)?.func()}
                </div>
            )}
        </>
    )
}