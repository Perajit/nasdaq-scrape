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
  var start = '2017-02-05T10:19:12.703Z';
  var end = '2017-02-05T10:20:11.238Z';
  var getDataByTimeRange;

  describe('GET nasdaq/:index', function() {
    before(function(done) {
      getDataByTimeRange = sinon.spy(nasaqIndexService, 'getDataByTimeRange');

      this.server = app.listen(port, function() {
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
      getDataByTimeRange.restore();

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

    it('return all data of all index', function(done) {
      var url = 'http://localhost:' + port + '/api/nasdaq/all';

      request(url,
        function(err, res, body) {
          var actualData = JSON.parse(body).data;

          expect(res.statusCode).to.equal(200);
          expect(nasaqIndexService.getDataByTimeRange.calledWith(null, null, null)).to.be.true;

          done();
        });
    });

    it('return data of all index from starting time to ending time', function(done) {
      var url = 'http://localhost:' + port + '/api/nasdaq/all?start=' + start + '&end=' + end;

      request(url,
        function(err, res, body) {
          var actualData = JSON.parse(body).data;

          expect(res.statusCode).to.equal(200);
          expect(getDataByTimeRange.calledWith(null, new Date(start), new Date(end))).to.be.true;

          done();
        });
    });

    it('return all data of specified index', function(done) {
      var url = 'http://localhost:' + port + '/api/nasdaq/NASDAQ';

      request(url,
        function(err, res, body) {
          var actualData = JSON.parse(body).data;

          expect(res.statusCode).to.equal(200);
          expect(getDataByTimeRange.calledWith('NASDAQ', null, null)).to.be.true;

          done();
        });
    });

    it('return data of specified index from starting time to ending time', function(done) {
      var url = 'http://localhost:' + port + '/api/nasdaq/NASDAQ?start=' + start + '&end=' + end;

      request(url,
        function(err, res, body) {
          var actualData = JSON.parse(body).data;

          expect(res.statusCode).to.equal(200);
          expect(getDataByTimeRange.calledWith('NASDAQ', new Date(start), new Date(end))).to.be.true;

          done();
        });
    });
  });
};

module.exports = test;