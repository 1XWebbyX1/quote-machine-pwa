'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quotesSchema = new Schema({
  quote: String,
  author: String
});

module.exports = mongoose.model('quotes', quotesSchema);
