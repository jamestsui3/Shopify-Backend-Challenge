const inventory = require('./inventory.js')
const location = require('./location.js')

const setAssociations = function (){
  location.hasMany(inventory, {
     onDelete: 'SET NULL',
     onUpdate: 'SET NULL'
  })
  inventory.belongsTo(location)
}

module.exports = setAssociations

