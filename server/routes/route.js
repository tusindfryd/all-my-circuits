// import express
const express = require('express')

// import controller
const partsRoutes = require('./../controllers/controller.js')

// create router
const router = express.Router()

// add route for GET request to retrieve all parts
// in server.js, parts route is specified as '/parts'
// this means that '/all' translates to '/parts/all'
router.get('/all', partsRoutes.partsAll)

// add route for POST request to create new part
// '/create' translates to '/parts/create'
router.post('/create', partsRoutes.partsCreate)

// add route for PUT request to delete specific part
// /delete' translates to '/parts/delete'
router.put('/delete', partsRoutes.partsDelete)

// add route for PUT request to reset parts list
// '/reset' translates to '/parts/reset'
router.put('/reset', partsRoutes.partsReset)

// Export router
module.exports = router