// functions that send sql to the database

//import pool
import { pool } from "./generate_table_script.js";
//MVP 1 

export async function fetchAllCountries(){
    const result = await pool.query('SELECT * FROM countries');
    return result.rows;
}


//
