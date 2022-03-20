// import database
const knex = require('./../db')

// retrieve parts
exports.partsAll = async (req, res) => {
  if (req.query.keyword) {
    knex('parts')
      .where('name', 'like', `%${String(req.query.keyword)}%`)
      .then(parts => {
        // send parts extracted from database in response
        res.json(parts)
      })
      .catch(err => {
        // send an error message in response
        res.json({
          message: `There was an error retrieving parts: ${err}`
        })
      })
  } else {
    // get all parts from database
    knex
      .select('*') // select all records
      .from('parts') // from 'parts' table
      .then(parts => {
        // send parts extracted from database in response
        res.json(parts)
      })
      .catch(err => {
        // send an error message in response
        res.json({
          message: `There was an error retrieving parts: ${err}`
        })
      })
  }
}

// create new part
exports.partsCreate = async (req, res) => {
  // add new part to database
  knex('parts')
    .insert({ // insert new record
      'name': req.body.name,
      'count': req.body.count,
      'notes': req.body.notes
    })
    .then(() => {
      // send a success message in response
      res.json({
        message: `Part \'${req.body.name}\' created.`
      })
    })
    .catch(err => {
      // send an error message in response
      res.json({
        message: `There was an error creating ${req.body.name}: ${err}`
      })
    })
}

// remove specific part
exports.partsDelete = async (req, res) => {
  // find specific part in the database and remove it
  knex('parts')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // send a success message in response
      res.json({
        message: `Part ${req.body.name} deleted.`
      })
    })
    .catch(err => {
      // send an error message in response
      res.json({
        message: `There was an error deleting ${req.body.name}: ${err}`
      })
    })
}

exports.partUpdate = async (req, res) => {
  if (req.body.type == "concat") {
    knex
      .select('*')
      .from('parts')
      .where('id', req.body.id)
      .then((part) => {
        var newValue = part[0].notes.concat(", ", req.body[req.body.fieldName])
        knex("parts")
          .where('id', req.body.id)
          .update(req.body.fieldName, newValue)
          .then(() => {
            // send a success message in response
            res.json({
              message: `Element was updated.`
            })
          })
          .catch(err => {
            // send an error message in response
            res.json({
              message: `There was an error during update: ${err}`
            })
          })
      })
      .catch(err => {
        // send an error message in response
        res.json({
          message: `There was an error during update: ${err}`
        })
      })

  } else if (req.body.type == "overwrite") {
    knex
      .select('*')
      .from('parts')
      .where('id', req.body.id)
      .update(req.body.fieldName, req.body[req.body.fieldName])
      .then(() => {
        // send a success message in response
        res.json({
          message: `Element was updated.`
        })
      })
  }
}

// change count of a part
exports.partCountModify = async (req, res) => {
  // find specific part in the database and change its count
  knex('parts')
    .where('id', req.body.id) // find correct record based on id
    .update('count', req.body.count)
    .then(() => {
      // send a success message in response
      res.json({
        message: `Count of ${req.body.name} was updated.`
      })
    })
    .catch(err => {
      // send an error message in response
      res.json({
        message: `There was an error updating ${req.body.name} count: ${err}`
      })
    })
}

// remove all parts on the list
exports.partsReset = async (req, res) => {
  // remove all parts from database
  knex
    .select('*') // select all records
    .from('parts') // from 'parts' table
    .truncate() // remove the selection
    .then(() => {
      // send a success message in response
      res.json({
        message: 'Part list cleared.'
      })
    })
    .catch(err => {
      // send an error message in response
      res.json({
        message: `There was an error resetting part list: ${err}.`
      })
    })
}