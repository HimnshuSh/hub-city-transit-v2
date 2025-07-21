import blueRoute from '../assets/data/route/r-dj86p-blueline2.geojson.json'
import greenRoute from '../assets/data/route/r-dj86p-greenline2.geojson.json'
import goldRoute from '../assets/data/route/r-dj86pp-goldline2.geojson.json'
import redRoute from '../assets/data/route/r-dj86p-redline2.geojson.json'
import orangeRoute from '../assets/data/route/r-dj86p-orangeline2.geojson.json'
import brownRoute from '../assets/data/route/r-dj86r-brownline2.geojson.json'
import purpleRoute from '../assets/data/route/r-dj8d0-purpleline2.geojson.json'

export default function getRouteForBus(busName) {
    if (busName === "hct blue1" || busName === "hct blue2") {
        return blueRoute
    }
    else if (busName === "hct Gold1" || busName === "hct gold2") {
        return goldRoute
    }
    else if (busName === "hct green") {
        return greenRoute
    }
    else if (busName === "hct brown" ) {
        return brownRoute
    }
    else if (busName === "hct purple") {
        return purpleRoute
    }
    else if (busName === "hct red") {
        return redRoute
    }
    else if (busName === "hct orange") {
        return orangeRoute
    }

}