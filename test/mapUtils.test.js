const MapUtil = require('../utils/mapUtil');

test('should calculate distances without error', () => {
    let map = new MapUtil();

    let result = map.getLocationsByDistance(startLocation, locations);
    expect(result.length).toBe(3);
});

test('should return distances in ASC order', () => {
    let map = new MapUtil();
    let result = map.getLocationsByDistance(startLocation, locations);

    expect(result[0].distance_in_miles).toBeLessThan(result[1].distance_in_miles);
    expect(result[1].distance_in_miles).toBeLessThan(result[2].distance_in_miles);
});

const locations = [
    {
        Latitude: 37,
        Longitude: -122.3
    },
    {
        Latitude: 31,
        Longitude: -122.3
    },
    {
        Latitude: 50.7,
        Longitude: -122.3
    }
];

const startLocation = {
    Latitude: 37.7,
    Longitude: -122.3
};