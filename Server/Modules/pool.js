// Get Postgres
const pg = require('pg');

const pool = new pg.Pool({
  // The database to connect
  database: 'weekend_to-do-app',
  // Our Localhost
  host: 'localhost',
  // Port to listen in Pg
  port:5432
})

// Export Pool
module.exports = pool