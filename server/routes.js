const express = require('express')
let router = express.Router()
const db = require('../database/db.js')
const inventory = require('../database/models/inventory.js')
const location = require('../database/models/location.js')


router
  .route('/inventory')
  .get((req, res) =>{
  inventory.findAll({include: location})
  .then(item => {
    res.send(item)
    })
  .catch(err => res.sendStatus(400))
  })
  .post((req, res) =>{
    var item = req.body.item
    var quantity = req.body.quantity
    inventory.create({
      item,
      quantity
    })
    .then(res.sendStatus(201))
    .catch(err => res.sendStatus(400))
  })
  .put((req, res) => {
    console.log(req.body)
    inventory.update(req.body.data, {
      where: {
        id : req.body.id
      }
    })
    .then(res.sendStatus(200))
    .catch(err => res.sendStatus(400))
  })
  .delete((req, res) => {
    inventory.destroy({
      where: {
        id : req.body.id
      }
    })
    .then(res.sendStatus(200))
    .catch(err => res.sendStatus(400))
  })
router
  .route('/location')
  .get((req, res) => {
    location.findAll({include: inventory})
    .then(place => {
      res.send(place)
    })
    .catch(err => res.sendStatus(400))
  })
  .post((req, res) => {
    var place = req.body.place
    location.create({
      place
    })
    .then(res.sendStatus(201))
    .catch(err => res.sendStatus(400))
  })
  .put((req, res) => {
    inventory.update(req.body.data, {
      where: {
        id : req.body.id
      }
    })
    .then(res.sendStatus(200))
    .catch(err => res.sendStatus(400))
  })
  .delete((req, res) => {
    location.destroy({
      where: {
        id : req.body.id
      }
    })
    .then(res.sendStatus(200))
    .catch(err => res.sendStatus(400))
  })



module.exports = router;