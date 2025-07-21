export default function BusLocationLayer() {
    
    const url = "https://utility.arcgis.com/usrsvcs/servers/b02066689d504f5f9428029f7268e060/rest/services/Hosted/8bd5047cc5bf4195887cc5237cf0d3e0_Track_View/FeatureServer/1/query?f=geojson&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry={%22xmin%22:-9952239.718110478,%22ymin%22:3657331.85371723454,%22xmax%22:-9933358.86251328,%22ymax%22:3679195.0687008603,%22spatialReference%22:{%22wkid%22:102100}}&geometryType=esriGeometryEnvelope&inSR=102100&outFields=location_timestamp,course,full_name,speed&returnCentroid=false&returnExceededLimitFeatures=false&outSR=4326"

    async function getData() {
        const response = await fetch(url)   
        const data = await response.json()
        return data
    }

    const busData = getData()

    busData = 
}