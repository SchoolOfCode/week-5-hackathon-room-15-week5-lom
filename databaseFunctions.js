// functions that send sql to the database

//import pool
import { pool } from "./generate_table_script.js";
//MVP 1 

export async function fetchAllCountries(){
    const result = await pool.query('SELECT * FROM countries');
    return result.rows;
}

export async function fetchAllCapitals(){
    const result = await pool.query('SELECT * FROM capitals');
    return result.rows;
}

export async function fetchCapitalsByCountryName(name){
    const result = await pool.query('SELECT c.name FROM capitals AS c INNER JOIN countries AS co ON c.country_id = co.id WHERE co.name = $1', [name])
    return result.rows;
}
    

//
