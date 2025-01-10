// functions that send sql to the database

//import pool
import { pool } from "./generate_table_script.js";
//MVP 1

export async function fetchCountriesAndCapitals() {
  const result = await pool.query(
    "SELECT * FROM capitals AS c INNER JOIN countries AS co ON c.country_id = co.id"
  );
  return result.rows;
}

export async function fetchAllCountries() {
  const result = await pool.query("SELECT * FROM countries");
  return result.rows;
}

export async function fetchAllCapitals() {
  const result = await pool.query("SELECT * FROM capitals");
  return result.rows;
}

export async function fetchCapitalsByCountryName(name) {
  const result = await pool.query(
    "SELECT c.name FROM capitals AS c INNER JOIN countries AS co ON c.country_id = co.id WHERE co.name = $1",
    [name]
  );
  return result.rows;
}

// export async function addCountryName(name) {
//   const result = await pool.query("INSERT INTO countries (name) VALUES ($1)", [
//     name,
//   ]);
//   return result.rows;
// }

// export async function addCapitalName(name) {
//   const result = await pool.query("INSERT INTO capitals (name) VALUES ($1)", [
//     name,
//   ]);
//   return result.rows;
// }

export async function addCountryWithCapital(countryName, capitalName) {
  const countryResult = await pool.query(
    "INSERT INTO countries (name) VALUES ($1) RETURNING id",
    [countryName]
  );
  const countryId = countryResult.rows[0].id;
  await pool.query("INSERT INTO capitals (name, country_id) VALUES ($1, $2)", [
    capitalName,
    countryId,
  ]);
  return { countryId, capitalName };
}
//
