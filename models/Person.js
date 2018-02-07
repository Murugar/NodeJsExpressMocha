'use strict';

const Mongoose = require('../db').Mongoose;

const personSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = Mongoose.model('Person', personSchema, 'person');

