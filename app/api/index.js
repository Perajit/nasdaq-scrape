var app = require('express')();
var controller = require('./controller');

function api(config) {
  app.get('/api/nasdaq/all', controller.getIndexDataByTimeRange);
  app.get('/api/nasdaq/:index', controller.getIndexDataByTimeRange);

  return app;
}

module.exports = api;