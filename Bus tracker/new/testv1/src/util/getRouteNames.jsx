export default function getRouteNames(busName) {

    const RouteNames = {
        "hct Gold1" : {
            shortName: 'Gold Line',
            longName: 'USM'
        },
        "hct gold2" : {
            shortName: 'Gold Line',
            longName: 'USM'
        },
        "hct blue1" : {
            shortName: 'Blue Line',
            longName: 'Hardy Street'
        },
        "hct blue2" : {
            shortName: 'Blue Line',
            longName: 'Hardy Street'
        },
        "hct green" : {
            shortName: 'Green Line',
            longName: '4th Street'
        },
        "hct brown" : {
            shortName: 'Brown Line',
            longName: '7th Street'
        },
        "hct purple" : {
            shortName: 'Purple Line',
            longName: "Palmer's Crossing"
        },
        "hct red" : {
            shortName: 'Red Line',
            longName: 'Country Club Road'
        },
        "hct orange" : {
            shortName: 'Orange Line',
            longName: 'Broadway Drive'
        }
    }

    return RouteNames[busName]
}