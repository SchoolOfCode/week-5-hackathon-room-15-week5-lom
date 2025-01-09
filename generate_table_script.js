import pg from "pg";

const connectionString = process.env.DATABASE_CONNECTION_STRING;

const pool = new pg.Pool({
  // Pass the connection string to the pool, so it knows how to connect to your database
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Use with caution
  },
});

async function generateDatabase() {
  try {
    await pool.query(`
        DROP TABLE IF EXISTS countries CASCADE;
        DROP TABLE IF EXISTS capitals CASCADE;
      `);

    await pool.query(`
create table countries (
    id bigint primary key generated always as identity,
    name text not null
  );
`);
    await pool.query(`
create table capitals (
  id bigint primary key generated always as identity,
  country_id bigint not null references countries (id),
  name text not null
);
  `);

    await pool.query(`
insert into
  countries (name)
values
  ('United States'),
  ('Canada'),
  ('Mexico'),
  ('Brazil'),
  ('United Kingdom'),
  ('France'),
  ('Germany'),
  ('Italy'),
  ('Japan'),
  ('Australia');
  `);

    await pool.query(`
insert into
  capitals (country_id, name)
values
  (
    (
      select
        id
      from
        countries
      where
        name = 'United States'
    ),
    'Washington, D.C.'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'Canada'
    ),
    'Ottawa'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'Mexico'
    ),
    'Mexico City'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'Brazil'
    ),
    'Brasília'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'United Kingdom'
    ),
    'London'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'France'
    ),
    'Paris'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'Germany'
    ),
    'Berlin'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'Italy'
    ),
    'Rome'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'Japan'
    ),
    'Tokyo'
  ),
  (
    (
      select
        id
      from
        countries
      where
        name = 'Australia'
    ),
    'Canberra'
  );
  `);
    console.log("Database generated successfully");
  } catch (error) {
    console.error("Could not generate database: ", error);
  } finally {
    await pool.end();
  }
}

await generateDatabase();
