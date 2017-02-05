var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

var NasdaqIndexSchema = new Schema({
  indexName: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  value: { type: Number },
  netChange: { type: Number },
  pctChange: { type: Number }
});

module.exports = mongoose.model('NasdaqIndex', NasdaqIndexSchema);