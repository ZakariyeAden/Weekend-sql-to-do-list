// Get Postgres
const pg = require('pg');


let pool;

if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app'
  })
}

// const pool = new pg.Pool({
//   // The database to connect
//   database: 'weekend-to-do-app',
//   // Our Localhost
//   host: 'localhost',
//   // Port to listen in Pg
//   port:5432
// })

// Export Pool
module.exports = pool



