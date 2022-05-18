const express = require('express');

const app = express();
const port = process.env.port || 3000;
const router = require('./routes.js');

const db = require('../database/db.js')
const setAssociations = require('../database/models/associations.js')


db.sync();
app.use(express.json());
setAssociations();
app.use(express.static(__dirname + '/../client/dist'))
app.use(router);

app.listen(port, () => {
  console.log('listening on ' + port)
})