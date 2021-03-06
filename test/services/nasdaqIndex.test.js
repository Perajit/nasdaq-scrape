describe('NasdaqInex service', function() {
  var expect = require('chai').expect;
  var loadFixture = require('mongoose-fixture-loader');
  var NasaqIndexModel = require('../../app/models/nasdaqIndex');
  var nasdaqIndexes = require('../fixtures/nasdaqIndexes');
  var nasaqIndexService = require('../../app/services/nasdaqIndex');

  describe('getDataByTimeRange', function() {
    var start = '2017-02-05T22:17:38.775Z';
    var end = '2017-02-05T22:19:09.327Z';

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

    it('should return all data of all index', function(done) {
      nasaqIndexService.getDataByTimeRange(null, null, null)
        .then(function(data) {
          var actualData = data;
          var expectedData = nasdaqIndexes;

          expect(JSON.stringify(actualData))
            .to.equal(JSON.stringify(expectedData));

          done();
        });
    });

    it('should return data of all index from starting time', function(done) {
      nasaqIndexService.getDataByTimeRange(null, start, null)
        .then(function(data) {
          var actualData = data;
          var expectedData = nasdaqIndexes.filter(function(item) {
            var itemDateTime = new Date(item.dateTime);
            return itemDateTime >= new Date(start);
          });

          expect(JSON.stringify(actualData))
            .to.equal(JSON.stringify(expectedData));

          done();
        });
    });

    it('should return data of all index until ending time', function(done) {
      nasaqIndexService.getDataByTimeRange(null, null, end)
        .then(function(data) {
          var actualData = data;
          var expectedData = nasdaqIndexes.filter(function(item) {
            var itemDateTime = new Date(item.dateTime);
            return itemDateTime <= new Date(end);
          });

          expect(JSON.stringify(actualData))
            .to.equal(JSON.stringify(expectedData));

          done();
        });
    });

    it('should return data of all index from starting time until ending time', function(done) {
      nasaqIndexService.getDataByTimeRange(null, start, end)
        .then(function(data) {
          var actualData = data;
          var expectedData = nasdaqIndexes.filter(function(item) {
            var itemDateTime = new Date(item.dateTime);
            return itemDateTime >= new Date(start) && itemDateTime <= new Date(end);
          });

          expect(JSON.stringify(actualData))
            .to.equal(JSON.stringify(expectedData));

          done();
        });
    });

    it('should return all data of specified index', function(done) {
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

    it('should return data of specified index from starting time', function(done) {
      nasaqIndexService.getDataByTimeRange('NASDAQ', start, null)
        .then(function(data) {
          var actualData = data;
          var expectedData = nasdaqIndexes.filter(function(item) {
            var itemDateTime = new Date(item.dateTime);
            return item.indexName === 'NASDAQ' && itemDateTime >= new Date(start);
          });

          expect(JSON.stringify(actualData))
            .to.equal(JSON.stringify(expectedData));

          done();
        });
    });

    it('should return data of specified index until ending time', function(done) {
      nasaqIndexService.getDataByTimeRange('NASDAQ', null, end)
        .then(function(data) {
          var actualData = data;
          var expectedData = nasdaqIndexes.filter(function(item) {
            var itemDateTime = new Date(item.dateTime);
            return item.indexName === 'NASDAQ' && itemDateTime <= new Date(end);
          });

          expect(JSON.stringify(actualData))
            .to.equal(JSON.stringify(expectedData));

          done();
        });
    });

    it('should return data of specified index from starting time until ending time', function(done) {
      nasaqIndexService.getDataByTimeRange('NASDAQ', start, end)
        .then(function(data) {
          var actualData = data;
          var expectedData = nasdaqIndexes.filter(function(item) {
            var itemDateTime = new Date(item.dateTime);
            return item.indexName === 'NASDAQ' && itemDateTime >= new Date(start) && itemDateTime <= new Date(end);
          });

          expect(JSON.stringify(actualData))
            .to.equal(JSON.stringify(expectedData));

          done();
        });
    });
  });

  describe('insertMultipleData', function() {
    var targetData = require('../fixtures/target');

    after(function(done) {
      NasaqIndexModel.remove({})
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('should insert all data into database', function(done) {
      nasaqIndexService.insertMultipleData(targetData)
        .then(function(docs) {
          expect(docs.length).to.equal(targetData.length);

          docs.forEach(function(doc) {
            expect(docs.length).to.equal(targetData.length);
          });

          done();
        });
    });
  });
});