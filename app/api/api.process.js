var app = require('express')();
var controller = require('./api.controller');

function api(config) {
  var port = process.env.PORT || config.API_DEFAULT_PORT;

  app.get('/api/nasdaq/:index', controller.getNasdaqIndexByTimeRange);

  app.listen(port, function () {
    console.log('***** Statred server on port ' + port);
  });
}

module.exports = api;