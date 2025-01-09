import express from "express";

import {
  fetchAllCountries,
} from "./databaseFunctions.js";

const app = express();

const PORT = process.env.PORT;

//app.get to the route

//write the get function to send the response with error handling
app.get('/countries', async function(req, res){
  const countries = await fetchAllCountries();
  res.json(countries);
  console.log(countries);
});




//



app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
