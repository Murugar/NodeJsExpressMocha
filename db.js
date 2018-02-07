'use strict';

const Mongoose = require('mongoose');
const config = require('./config');

Mongoose.Promise = global.Promise;

Mongoose.connect(config.db.uri, {
  useMongoClient: true
});

const db = Mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
  console.log(`Database started: ${config.db.uri}`);
});

module.exports = {
  Mongoose, db
};
