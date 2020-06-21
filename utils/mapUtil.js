const haversine = require('haversine');
const DISTANCE_UNIT = 'mile';

module.exports = class MapUtil {
    getLocationsByDistance(startLocation, endLocations, limit = 5) {
        let result = [];
        for (let endLocation of endLocations) {
            let location = endLocation;
            location.distance_in_miles = this.calculateDistance(startLocation, endLocation);
            result.push(location);
        }
        this.sortByDistance(result);
        return result.slice(0, limit + 1);
    }

    calculateDistance(start, end) {
        let pointA = {
            latitude: parseFloat(start.Latitude),
            longitude: parseFloat(start.Longitude)
        };
        let pointB = {
            latitude: end.Latitude,
            longitude: end.Longitude
        };
        return haversine(pointA, pointB, {unit: DISTANCE_UNIT});
    };

    sortByDistance(locations) {
        locations.sort((a, b) => (a.distance_in_miles > b.distance_in_miles) ? 1 : -1);
    }
};