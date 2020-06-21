const express = require('express');
const app = express();
const dataLoader = require('./data/dataLoader');
const mapUtil = require('./utils/mapUtil');
const map = new mapUtil();
const paramParser = require('./utils/paramParser');
const parser = new paramParser();

const PORT = 3000;
const RECORDS_LIMIT = 5;

let data = [];
let dataLoaded = false;

async function loadData() {
    if (!dataLoaded) {
        const loader = new dataLoader();

        data = await loader.getData();
        dataLoaded = true;
    }
}

app.get('/food-truck/find', async (request, response) => {
    await loadData();

    const error = parser.parseQueryArguments(request);
    if (error) {
        response.status(400).json(error);
        return;
    }

    const startLocation = {
        Latitude: request.query.latitude,
        Longitude: request.query.longitude
    };

    const numberOfRecords = request.query.limit !== undefined ? parseInt(request.query.limit) : RECORDS_LIMIT;
    response.send(map.getLocationsByDistance(startLocation, data, numberOfRecords));
});

app.listen(PORT);