var NasdaqIndexModel = require('../models/nasdaqIndex');

function getDataByTimeRange(indexName, startDateTime, endDateTime) {
  var criteria = {};

  if (indexName) {
    criteria.indexName = indexName;
  }

  if (startDateTime && endDateTime) {
    criteria.dateTime = {
      $gte: startDateTime,
      $lte: endDateTime
    };
  }
  else if (startDateTime) {
    criteria.dateTime = {
      $gte: startDateTime
    };
  }
  else if (endDateTime) {
    criteria.dateTime = {
      $lte: endDateTime
    };
  }

  return NasdaqIndexModel.find(criteria);
}

function insertMultipleData(arr) {
  return NasdaqIndexModel.insertMany(arr);
}

module.exports = {
  getDataByTimeRange: getDataByTimeRange,
  insertMultipleData: insertMultipleData
};