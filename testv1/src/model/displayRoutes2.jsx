import { useEffect, useRef, useState, useMemo } from 'react'
import { useMap } from "react-leaflet"
import { busColor } from '../components/busIcons'
import projectStopToRoute from './stopProjection'
import getNextStop from './nextstop'
import getRouteForBus from '../util/getRouteForBus'
import BusIcon from '../assets/icons/bus-icon2.png'
import L from "leaflet"
import getRouteNames from '../util/getRouteNames'
import isEqual from 'react-fast-compare'
import { AnimatePresence, motion } from 'motion/react'

function StopName({ stopDataArray, busData }) {
    const busDataLen = Object.keys(busData).length
    const map = useMap()

    const handleNextStopClick = (stopData) => {
        if (stopData.stopName !== "N/A") {
            const stopCoordinates = [stopData.coordinates[1] - 0.00075, stopData.coordinates[0]]
            if (stopCoordinates) {
                map.flyTo(stopCoordinates, 18)

                map.eachLayer(layer => {
                    if (layer instanceof L.CircleMarker && layer.feature.properties.stop_id === stopData.stopId) {
                        setTimeout(() => layer.openPopup(), 500)
                    }
                })
            }
        }
    }

    const stopNameRef = useRef([])
    const [heights, setHeights] = useState([])

    useEffect(() => {
        setHeights(stopNameRef.current.map(ref => ref.offsetHeight))
    }, [])

    const progressheight = useMemo(() => {
        if (heights.length === 0) return []

        const newProgressHeight = []
        for (let i = 0; i < (heights.length - 1); i++) {
            newProgressHeight.push({
                height: (heights[i] / 2) + 25 + (heights[i + 1] / 2),
                stopName: stopDataArray[i + 1].stopName,
                stopId: stopDataArray[i + 1].stopId,
                stopDistance: stopDataArray[i + 1].distance - stopDataArray[i].distance
            })
        }

        return newProgressHeight
    }, [heights, stopDataArray])

    return (
        <div className='route-stop-container'>
            <div className='route-progress-container'>
                {
                    (heights.length !== 0) && <div className='route-progress-stop-icon-container'>
                        {heights.map((height, index) => <div className='route-progress-stop-icon' key={`stop-marker-${index}`} style={{ height: `${height}px` }}><div><div style={{ backgroundColor: `${busColor[busDataLen !== 2 ? busData.busFullName : busData.data2.busFullName]}` }}></div></div></div>)}
                    </div>
                }
                {
                    (heights.length !== 0) &&
                    <div
                        className='backdrop'
                        style={
                            {
                                top: `${heights[0] / 2 + 25}px`,
                                height: `${progressheight.reduce((acc, height) => acc + height.height, 0)}px`,
                                position: 'absolute',
                                width: "4px",
                                zIndex: 2,
                                backgroundColor: 'hsl(0, 0%, 85%)',
                                border: 'solid hsl(0, 0%, 75%)',
                                borderWidth: '0px 1px',
                                marginRight: '18px'
                            }
                        }
                    >
                    </div>
                }
                {
                    (heights.length !== 0 && busDataLen !== 2) ? (
                        <div className='route-progress-bar-container' style={{ top: `${heights[0] / 2 + 25}px` }}>

                            {progressheight.map((data, index) => (
                                <div
                                    className='bus-progress'
                                    key={`bus-marker-${index}`}
                                    style={{ height: `${data.height}px`, backgroundColor: "transparent", position: 'relative' }}
                                >
                                    {('stopId' in busData) && (busData.stopId === data.stopId) && (
                                        <div
                                            className='bus-marker'
                                            style={
                                                {
                                                    height: '14px',
                                                    width: '14px',
                                                    borderRadius: '50%',
                                                    border: `solid hsl(0, 0%, 75%) 1px`,
                                                    position: 'absolute',
                                                    top: `${((busData.busDistance - stopDataArray[index].distance) / data.stopDistance) * data.height - 7.5}px`,
                                                    backgroundColor: `${busColor[busData.busFullName]}`,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }
                                            }
                                        >
                                            <img src={BusIcon} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className='route-progress-bar-container' style={{ top: `${heights[0] / 2 + 25}px` }}>
                                {progressheight.map((data, index) => (
                                    <div
                                        className='bus-progress'
                                        key={`bus-marker-${index}`}
                                        style={{ height: `${data.height}px`, backgroundColor: "transparent", position: 'relative' }}
                                    >
                                        {('stopId' in busData.data1) && (busData.data1.stopId === data.stopId) && (
                                            <div
                                                className='bus-marker'
                                                style={
                                                    {
                                                        height: '14px',
                                                        width: '14px',
                                                        borderRadius: '50%',
                                                        border: `solid hsl(0, 0%, 75%) 1px`,
                                                        position: 'absolute',
                                                        top: `${((busData.data1.busDistance - stopDataArray[index].distance) / data.stopDistance) * data.height - 7.5}px`,
                                                        backgroundColor: `${busColor[busData.data1.busFullName]}`,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }
                                                }
                                            >
                                                <img src={BusIcon} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='route-progress-bar-container' style={{ top: `${heights[0] / 2 + 25}px` }}>
                                {progressheight.map((data, index) => (
                                    <div
                                        className='bus-progress'
                                        key={`bus-marker-${index}`}
                                        style={{ height: `${data.height}px`, backgroundColor: "transparent", position: 'relative' }}
                                    >
                                        {('stopId' in busData.data2) && (busData.data2.stopId === data.stopId) && (
                                            <div
                                                className='bus-marker'
                                                style={
                                                    {
                                                        height: '14px',
                                                        width: '14px',
                                                        borderRadius: '50%',
                                                        border: `solid hsl(0, 0%, 75%) 1px`,
                                                        position: 'absolute',
                                                        top: `${((busData.data2.busDistance - stopDataArray[index].distance) / data.stopDistance) * data.height - 7.5}px`,
                                                        backgroundColor: `${busColor[busData.data2.busFullName]}`,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }
                                                }
                                            >
                                                <img src={BusIcon} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
            <div className='route-stopname-container'>
                {stopDataArray.map((stop, index) => (
                    <div key={`${stop.stopName}-${index}`} ref={el => stopNameRef.current[index] = el} className='route-stopnames'>
                        <span style={{ cursor: 'pointer' }} onClick={() => handleNextStopClick(stop)}>{stop.stopName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Route({ busName, showRoute, setShowRoute, busData }) {
    const busDataLen = busData ? Object.keys(busData).length : null

    let busData1 = null
    let busData2 = null

    if (busDataLen == 2) {
        busData1 = busData.bus1
        busData2 = busData.bus2
    }

    const ref = useRef(null)
    const routeNames = getRouteNames(busName)

    const [routeContent, setRouteContent] = useState(null)
    const prevBusData = useRef(busData)

    const expData = useRef(null)

    function toggleRoute() {

        if (!routeContent) {
            const route = getRouteForBus(busName)

            const stopDataArray = projectStopToRoute(getRouteForBus(busName))
            stopDataArray.unshift({ ...stopDataArray[stopDataArray.length - 1], distance: 0 })

            expData.current = {
                route,
                stopDataArray
            }
        }

        setShowRoute(prev => (prev === busName ? null : busName))
    }

    useEffect(() => {
        if (showRoute === busName) {
            if (!routeContent || !isEqual(prevBusData.current, busData)) {

                if (busDataLen == 2) {
                    const nextstopData1 = busData1 ? getNextStop(busData1, true) : null
                    const data1 = busData1 ? {
                        busFullName: busData1.properties.full_name,
                        busDistance: nextstopData1.busDistance,
                        stopName: nextstopData1.stopName,
                        stopDistance: nextstopData1.distance,
                        stopId: nextstopData1.stopId
                    } : {
                        busFullName: busName
                    }
                    const nextstopData2 = busData2 ? getNextStop(busData2, true) : null
                    const data2 = busData2 ? {
                        busFullName: busData2.properties.full_name,
                        busDistance: nextstopData2.busDistance,
                        stopName: nextstopData2.stopName,
                        stopDistance: nextstopData2.distance,
                        stopId: nextstopData2.stopId
                    } : {
                        busFullName: busName
                    }

                    prevBusData.current = busData

                    setRouteContent({
                        data1,
                        data2
                    })
                } else {
                    const nextstopData = busData ? getNextStop(busData, true) : null
                    const data = busData ? {
                        busFullName: busData.properties.full_name,
                        busDistance: nextstopData.busDistance,
                        stopName: nextstopData.stopName,
                        stopDistance: nextstopData.distance,
                        stopId: nextstopData.stopId
                    } : {
                        busFullName: busName
                    }

                    prevBusData.current = busData

                    setRouteContent({
                        busData: data
                    })
                }
            }
        }
        else {
            setRouteContent(null)
        }
    }, [busData, showRoute])


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
        <div className='route-container-items'>
            <div ref={ref} className='route-header' onClick={toggleRoute}>
                <div className='route-title'>
                    <div>{routeNames.shortName}</div>
                    <div>({routeNames.longName})</div>
                </div>
                <div>{showRoute === busName ? '-' : '+'}</div>
            </div>
            <AnimatePresence mode='sync'>
                {showRoute === busName && routeContent &&
                    <motion.div
                        className='route-content'
                        key={showRoute}
                        variants={heightVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"

                    >
                        <div className='route-desc'>{expData.current.route.features[0].properties.route_desc}</div>
                        <StopName stopDataArray={expData.current.stopDataArray} busData={(busDataLen !== 2) ? routeContent.busData : routeContent} />
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default function DisplayRoutes({ busData }) {
    const [showRoute, setShowRoute] = useState(null)

    const busObject = (busData && busData.status !== 'loading')
        ? busData.features.reduce((acc, bus) => {
            acc[bus.properties.full_name] = bus;
            return acc;
        }, {})
        : {}

    const getBus = (name) => {
        return busObject[name] || null
    }

    return (
        <div className='route-container'>
            <Route
                busName={"hct Gold1"}
                showRoute={showRoute}
                setShowRoute={setShowRoute}
                busData={{ "bus1": getBus("hct Gold1"), "bus2": getBus("hct gold2") }}
            />
            <hr className='route' />

            <Route
                busName={"hct green"}
                showRoute={showRoute}
                setShowRoute={setShowRoute}
                busData={getBus("hct green")}
            />
            <hr className='route' />

            <Route
                busName={"hct blue1"}
                showRoute={showRoute}
                setShowRoute={setShowRoute}
                busData={{ "bus1": getBus("hct blue1"), "bus2": getBus("hct blue2") }}
            />
            <hr className='route' />

            <Route
                busName={"hct brown"}
                showRoute={showRoute}
                setShowRoute={setShowRoute}
                busData={getBus("hct brown")}
            />
            <hr className='route' />

            <Route
                busName={"hct red"}
                showRoute={showRoute}
                setShowRoute={setShowRoute}
                busData={getBus("hct red")}
            />
            <hr className='route' />

            <Route
                busName={"hct purple"}
                showRoute={showRoute}
                setShowRoute={setShowRoute}
                busData={getBus("hct purple")}
            />
            <hr className='route' />

            <Route
                busName={"hct orange"}
                showRoute={showRoute}
                setShowRoute={setShowRoute}
                busData={getBus("hct orange")}
            />
        </div>
    )
}