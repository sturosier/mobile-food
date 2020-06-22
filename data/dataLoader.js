const csv = require("csvtojson");

const MOBILE_FOOD_TABLE = 'data/Mobile_Food_Facility_Permit.csv';

module.exports = class DataLoader {
    async getFoodTrucks(table = MOBILE_FOOD_TABLE) {
        let result = [];
        const json = await csv().fromFile(table);

        for (const data of json) {
            if(data.Status !== 'APPROVED' || data.FacilityType !== 'Truck') {
                continue;
            }
            let object = {
                Address: data.Address,
                FoodItems: data.FoodItems,
                ZipCode: data['Zip Codes'],
                Latitude: data.Latitude,
                Longitude: data.Longitude
            };
            result.push(object);
        }
        return result;
    }
};
