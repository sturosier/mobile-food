- Food Truck Location REST API -
    - Given a valid location (latitude & longitude), we calculate the distance to all the food trucks. The result is sorted by distance.
    - Only the facilities with 'APPROVED' Status and 'Truck' FacilityType are queried.
    - The default number of locations returned is 5, but the limit can be modified.
    - In order to calculate a distance, we use a NodeJS library that implements Haversine's formula (see more on Wikipedia)

- Example calls
    -  `curl --location --request GET 'http://localhost:3000/food-truck/find?latitude=37.77&longitude=-122.3'`
    -  `curl --location --request GET 'http://localhost:3000/food-truck/find?latitude=37.77&longitude=-122.3&limit=10'`
    
Developer's Guide:    
1) install nodeJS from https://nodejs.org/en/download/
2) Make sure that port 3000 is available on you machine, or change the `PORT` constant in the `app.js` file
3) From the root folder, run `npm install`
4) To make sure everything is fine, run the unit-tests with `npm test`
5) Start the application with `npm start`
6) Run one of the example calls from Postman or the terminal
7) A good place to start looking at the code is in `app.js`