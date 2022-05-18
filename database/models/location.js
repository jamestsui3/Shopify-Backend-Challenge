const Sequelize = require('sequelize');

const db = require('../db.js')

const location = db.define('location', {
  place: {
    type: Sequelize.STRING,
    unique: true
  }
})



module.exports = location
