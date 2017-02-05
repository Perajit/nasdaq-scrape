var expect = require('chai').expect;
var loadFixture = require('mongoose-fixture-loader');
var NasaqIndexModel = require('../../app/models/nasdaqIndex');
var nasaqIndexService = require('../../app/services/nasdaqIndex');
var nasdaqIndexes = require('../fixtures/nasdaqIndexes');

describe('NasdaqInex service', function() {
  var start = '2017-02-05T10:19:12.703Z';
  var end = '2017-02-05T10:20:11.238Z';

  before(function(done) {
    loadFixture(NasaqIndexModel, nasdaqIndexes)
      .then(function() {
        var total = nasdaqIndexes.length;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  after(function(done) {
    NasaqIndexModel.remove({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('return all data of all index', function(done) {
    nasaqIndexService.getDataByTimeRange(null, null, null)
      .then(function(data) {
        var actualData = data;
        var expectedData = nasdaqIndexes;

        expect(JSON.stringify(actualData))
          .to.equal(JSON.stringify(expectedData));

        done();
      });
  });

  it('return data of all index from starting time', function(done) {
    nasaqIndexService.getDataByTimeRange(null, start, null)
      .then(function(data) {
        var actualData = data;
        var expectedData = nasdaqIndexes.filter(function(item) {
          return new Date(item.dateTime) >= new Date(start);
        });

        expect(JSON.stringify(actualData))
          .to.equal(JSON.stringify(expectedData));

        done();
      });
  });

  it('return data of all index until ending time', function(done) {
    nasaqIndexService.getDataByTimeRange(null, null, end)
      .then(function(data) {
        var actualData = data;
        var expectedData = nasdaqIndexes.filter(function(item) {
          return new Date(item.dateTime) <= new Date(end);
        });

        expect(JSON.stringify(actualData))
          .to.equal(JSON.stringify(expectedData));

        done();
      });
  });

  it('return all data of specified index', function(done) {
    nasaqIndexService.getDataByTimeRange('NASDAQ', null, null)
      .then(function(data) {
        var actualData = data;
        var expectedData = nasdaqIndexes.filter(function(item) {
          return item.indexName === 'NASDAQ';
        });

        expect(JSON.stringify(actualData))
          .to.equal(JSON.stringify(expectedData));

        done();
      });
  });

  it('return data of specified index from starting time', function(done) {
    nasaqIndexService.getDataByTimeRange('NASDAQ', start, null)
      .then(function(data) {
        var actualData = data;
        var expectedData = nasdaqIndexes.filter(function(item) {
          return item.indexName === 'NASDAQ' && new Date(item.dateTime) >= new Date(start);
        });

        expect(JSON.stringify(actualData))
          .to.equal(JSON.stringify(expectedData));

        done();
      });
  });

  it('return data of specified index until ending time', function(done) {
    nasaqIndexService.getDataByTimeRange('NASDAQ', null, end)
      .then(function(data) {
        var actualData = data;
        var expectedData = nasdaqIndexes.filter(function(item) {
          return item.indexName === 'NASDAQ' && new Date(item.dateTime) <= new Date(end);
        });

        expect(JSON.stringify(actualData))
          .to.equal(JSON.stringify(expectedData));

        done();
      });
  });
});