var sinon = require('sinon');
var expect = require('chai').expect;
var request = require('request');
var loadFixture = require('mongoose-fixture-loader');
var apiProcess = require('../../app/api/index');
var NasaqIndexModel = require('../../app/models/nasdaqIndex');
var nasdaqIndexes = require('../fixtures/nasdaqIndexes');
var nasaqIndexService = require('../../app/services/nasdaqIndex');

var test = function(config) {
  var app = apiProcess(config);
  var port = config.API_DEFAULT_PORT;

  describe('GET nasdaq/:index', function() {
    before(function(done) {
      this.server = app.listen(port, function() {
        console.log('***** Started server on port ' + port);
        loadFixture(NasaqIndexModel, nasdaqIndexes)
          .then(function() {
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    after(function(done) {
      this.server.close(function() {
        NasaqIndexModel.remove({})
          .then(function() {
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    it('return all data', function(done) {
      var url = 'http://localhost:' + port + '/api/nasdaq/all';

      request(url,
        function(err, res, body) {
          var actualData = JSON.parse(body).data;

          nasaqIndexService.getDataByTimeRange(null, null, null)
            .then(function(data) {
              expect(JSON.stringify(actualData)).to.equal(JSON.stringify(data));
              done(err);
            });
        });
    });
  });
};

module.exports = test;