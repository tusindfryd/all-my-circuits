// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// import routes
const partsRouter = require('./routes/route')

// set default port for express app
const PORT = process.env.PORT || 4001

// create express app
const app = express()

// apply middleware
// note: keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// implement parts route
app.use('/parts', partsRouter)

// implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Server error')
})

// implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Not found')
})

// start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})