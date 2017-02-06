var test = function(config) {
  describe('API', function() {
    var expect = require('chai').expect;
    var spy = require('sinon').spy;
    var apiProcess = require('../../app/api/index');
    var app = apiProcess(config);
    var port = config.API_DEFAULT_PORT;

    before(function(done) {
      this.server = app.listen(port, function() {
        done();
      });
    });

    after(function(done) {
      this.server.close(function() {
        done();
      });
    });

    describe('GET nasdaq/:index', function() {
      var request = require('request');
      var loadFixture = require('mongoose-fixture-loader');
      var NasaqIndexModel = require('../../app/models/nasdaqIndex');
      var nasdaqIndexes = require('../fixtures/nasdaqIndexes');
      var nasaqIndexService = require('../../app/services/nasdaqIndex');
      var start = '2017-02-05T10:19:12.703Z';
      var end = '2017-02-05T10:20:11.238Z';
      var getDataByTimeRange;

      before(function(done) {
        getDataByTimeRange = spy(nasaqIndexService, 'getDataByTimeRange');

        loadFixture(NasaqIndexModel, nasdaqIndexes)
          .then(function() {
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      after(function(done) {
        getDataByTimeRange.restore();

        NasaqIndexModel.remove({})
          .then(function() {
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('should return all data of all index', function(done) {
        var url = 'http://localhost:' + port + '/api/nasdaq/all';

        request(url,
          function(err, res, body) {
            var actualData = JSON.parse(body).data;

            expect(res.statusCode).to.equal(200);
            expect(nasaqIndexService.getDataByTimeRange.calledWith(null, null, null)).to.be.true;

            done();
          });
      });

      it('should return data of all index from starting time to ending time', function(done) {
        var url = 'http://localhost:' + port + '/api/nasdaq/all?start=' + start + '&end=' + end;

        request(url,
          function(err, res, body) {
            var actualData = JSON.parse(body).data;

            expect(res.statusCode).to.equal(200);
            expect(getDataByTimeRange.calledWith(null, new Date(start), new Date(end))).to.be.true;

            done();
          });
      });

      it('should return all data of specified index', function(done) {
        var url = 'http://localhost:' + port + '/api/nasdaq/NASDAQ';

        request(url,
          function(err, res, body) {
            var actualData = JSON.parse(body).data;

            expect(res.statusCode).to.equal(200);
            expect(getDataByTimeRange.calledWith('NASDAQ', null, null)).to.be.true;

            done();
          });
      });

      it('should return data of specified index from starting time to ending time', function(done) {
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
  });
};

module.exports = test;