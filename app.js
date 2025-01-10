import express from "express";

import {
  fetchAllCountries,
  fetchAllCapitals,
  fetchCapitalsByCountryName,
  addCountryWithCapital,
  // addCountryName,
  // addCapitalName,
} from "./databaseFunctions.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

//app.get to the route

//write the get function to send the response with error handling
app.get("/countries", async function (req, res) {
  const countries = await fetchAllCountries();
  res.json(countries);
  console.log(countries);
});

app.get("/allCapitals", async function (req, res) {
  const city = await fetchAllCapitals();
  res.json(city);
  console.log(city);
});

app.get("/capitals", async function (req, res) {
  const name = req.query.name;
  const capitalByName = await fetchCapitalsByCountryName(name);
  res.json(capitalByName);
});

app.post("/", async function (req, res) {
  const data = req.body;
  console.log(data);
  // await addCountryName(data.countryname);
  // await addCapitalName(data.capitalname);
  await addCountryWithCapital(data.countryname, data.capitalname);
  res.status(201).json(data);
});

//

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
