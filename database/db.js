const Sequelize = require('sequelize');

let db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/database.sqlite'
})

db.authenticate()
  .then(() => console.log('connected'))
  .catch(err => console.log('THERE IS AN ERROR ' + err))

module.exports = db