const Sequelize = require('sequelize');

const db = require('../db.js')

const inventory = db.define('inventory', {
  item: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }

})



module.exports = inventory
