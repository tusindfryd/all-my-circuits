// import path module
const path = require('path')

// get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// create a table in the database called "parts"
knex.schema
  // make sure no "parts" table exists
  // before trying to create new
  .hasTable('parts')
  .then((exists) => {
    if (!exists) {
      // if no "parts" table exists
      // create new, with "id", "name", "count", and "octopart url" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record
      return knex.schema.createTable('parts', (table) => {
          table.increments('id').primary()
          table.string('name')
          table.string('count')
          table.string('url')
        })
        .then(() => {
          // log success message
          console.log('Table \'Parts\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // log success message
    console.log('Done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// debugging: log all data in "parts" table
knex.select('*').from('parts')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// export the database
module.exports = knex