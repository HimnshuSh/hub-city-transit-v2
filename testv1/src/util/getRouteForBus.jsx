import blueRoute from '../assets/data/route/r-dj86p-blueline2.geojson.json'
import greenRoute from '../assets/data/route/r-dj86p-greenline2.geojson.json'
import goldRoute from '../assets/data/route/r-dj86pp-goldline2.geojson.json'
import redRoute from '../assets/data/route/r-dj86p-redline2.geojson.json'
import orangeRoute from '../assets/data/route/r-dj86p-orangeline2.geojson.json'
import brownRoute from '../assets/data/route/r-dj86r-brownline2.geojson.json'
import purpleRoute from '../assets/data/route/r-dj8d0-purpleline2.geojson.json'

const routes = {
  'hct blue1': blueRoute,
  'hct blue2': blueRoute,
  'hct Gold1': goldRoute,
  'hct gold2': goldRoute,
  'hct green': greenRoute,
  'hct brown': brownRoute,
  'hct purple': purpleRoute,
  'hct red': redRoute,
  'hct orange': orangeRoute,
}

export default function getRouteForBus(busName) {
  return routes[busName]
}