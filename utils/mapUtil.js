const haversine = require('haversine');
const DISTANCE_UNIT = 'mile';

module.exports = class MapUtil {
    getLocationsByDistance(startLocation, endLocations, limit) {
        let result = [];
        for (const endLocation of endLocations) {
            let location = endLocation;
            location.distance_in_miles = this.calculateDistance(startLocation, endLocation);
            result.push(location);
        }
        this.sortByDistance(result);
        return result.slice(0, limit);
    }

    calculateDistance(start, end) {
        const pointA = {
            latitude: parseFloat(start.Latitude),
            longitude: parseFloat(start.Longitude)
        };
        const pointB = {
            latitude: end.Latitude,
            longitude: end.Longitude
        };
        return haversine(pointA, pointB, {unit: DISTANCE_UNIT});
    };

    sortByDistance(locations) {
        locations.sort((a, b) => (a.distance_in_miles > b.distance_in_miles) ? 1 : -1);
    }
};