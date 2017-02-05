var nasdaqIndexService = require('../services/nasdaqIndex.service');

function getNasdaqIndexByTimeRange(req, res, next) {
  var indexName = req.params.index;
  var startParam = req.params.start;
  var endParam = req.params.end;
  var startDateTime = new Date(startParam);
  var endDateTime = new Date(endParam);

  if (isNaN(startDateTime)) {
    startDateTime = null;
  }
  if (isNaN(endDateTime)) {
    endDateTime = null;
  }

  nasdaqIndexService
    .getDataByTimeRange(indexName, startDateTime, endDateTime)
    .then(function(data) {
      res.json({ status: true, data: data });
    })
    .catch(function(err) {
      res.json({status: false, error: err.message});
    });
}

module.exports = {
  getNasdaqIndexByTimeRange: getNasdaqIndexByTimeRange
};