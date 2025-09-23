import nearestPointOnLine from "@turf/nearest-point-on-line";

// Remove the import statement that is causing the error.
// import goldRoute from "../assets/data/route/r-dj86p-greenline.geojson.json"

// Use fetch to get the data from the relative path.
// The .json() method parses the response as a JavaScript object.
fetch("../assets/data/route/r-dj86p-greenline.geojson.json")
    .then(response => {
        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(goldRoute => {
        // Once the data is fetched and parsed, run your existing code.
        const stopGeoJsonData = goldRoute
            .features[0]
            .properties
            .route_stops
            .map(stopData => ({
                type: "Feature",
                geometry: stopData.stop.geometry,
                properties: {
                    id: stopData.stop.id,
                    stop_id: stopData.stop.stop_id,
                    stop_name: stopData.stop.stop_name
                }
            }));

        const stopFeatureCollection = {
            type: "FeatureCollection",
            features: stopGeoJsonData
        };

        console.log(stopFeatureCollection);
    })
    .catch(error => {
        console.error("Error loading the GeoJSON file:", error);
    });