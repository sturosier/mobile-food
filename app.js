const express = require('express');
const app = express();
const dataLoader = require('./data/dataLoader');
const mapUtil = require('./utils/mapUtil');
const paramParser = require('./utils/paramParser');
const parser = new paramParser();
const map = new mapUtil();
const loader = new dataLoader();
const PORT = 3000;

//TODO
/**
 * 1) Move route to different file -
 * accept lat and long -
 * filter trucks
 * accept limit
 * support port as env var. -
 * Add unit -tests
 * Update README
 */
let data = [];
let dataLoaded = false;
async function init() {
    if(!dataLoaded) {
        data = await loader.getData();
        dataLoaded = true;
    }
}

app.get('/mobile-food/find', async (request, response) => {
    await init();

    let error = parser.parseQueryArguments(request);
    if(error) {
        response.status(400).json(error);
        return;
    }

    let startLocation = {
        Latitude: request.query.latitude,
        Longitude: request.query.longitude
    };

    response.send(map.getLocationsByDistance(startLocation, data));
});

app.listen(PORT);