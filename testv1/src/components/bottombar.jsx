import { useRef, useEffect, useState } from 'react'
import ButtonComponent from './button'
import L from 'leaflet'
import { AnimatePresence, motion } from 'motion/react'

import DisplaySchedule from '../model/displaySchedule'
import DisplayRoutes from '../model/displayRoutes2'
import DisplaySearch from '../model/displaySearch'
import DisplayFare from '../model/displayFare'
import DisplayLegend from '../model/displayLegend'

export default function BottomBar({ busData, searchLayers }) {
    const [activeButton, setActiveButton] = useState(null)
    const bottomBarRef = useRef(null)

    const buttonArray = [
        { name: 'Schedule', icon: 'src/assets/icons/schedule-icon2.png', height: '30px' },
        { name: 'Routes', icon: 'src/assets/icons/route-icon.png', height: '30px' },
        { name: 'Search', icon: 'src/assets/icons/search-icon2.png', height: '30px' },
        { name: 'Fare', icon: 'src/assets/icons/fare-icon.png', height: '30px' },
        { name: 'Legend', icon: 'src/assets/icons/legend-icon.png', height: '30px' },
    ]

    function handleButtonClick(buttonName) {
        setActiveButton(prevActiveButton =>
            prevActiveButton === buttonName ? null : buttonName
        )
    }

    useEffect(() => {
        if (bottomBarRef.current) {
            L.DomEvent.disableClickPropagation(bottomBarRef.current);
            L.DomEvent.disableScrollPropagation(bottomBarRef.current);
        }
    }, [])

    const renderActiveComponent = () => {
        switch (activeButton) {
            case 'Schedule':
                return <DisplaySchedule />
            case 'Routes':
                return <DisplayRoutes busData={busData} />
            case 'Search':
                return <DisplaySearch searchLayers={searchLayers} />
            case 'Fare':
                return <DisplayFare />
            case 'Legend':
                return <DisplayLegend />
            default:
                return null
        }
    }

    const heightVariants = {
        initial: { height: 0, opacity: 0 },

        animate: {
            height: 'auto',
            opacity: 1,
            transition: {
                height: { type: 'spring', stiffness: 400, damping: 30 },
                // Apply standard transition to opacity
                opacity: { duration: 0.2 }
            }
        },

        exit: {
            height: 0,
            opacity: 0,
            transition: {
                // CRITICAL: Ensure height collapse is fast and smooth
                height: { type: 'tween', duration: 0.3 },
                opacity: { duration: 0.15 },

            }
        },
    }

    return (
        <div ref={bottomBarRef}>
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

            <AnimatePresence mode='sync'>
                {activeButton && (
                    <motion.div
                        className='function-box'
                        key={activeButton}
                        variants={heightVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"

                        // CRITICAL: Ensure overflow is hidden on the animating element
                        style={{ overflow: 'hidden' }}
                    >
                        {renderActiveComponent()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}