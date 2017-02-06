describe('Background controller', function() {
  var expect  = require("chai").expect;
  var stub = require('sinon').stub;
  var nasaqIndexService = require('../../app/services/nasdaqIndex');
  var controller = require('../../app/background/controller');
  var targetData = require('../fixtures/target');
  var targetPath = require('path').resolve(__dirname + '/../fixtures/target.html');

  require('sinon-as-promised');

  describe('scrape', function() {
    it('should extract and save data correctly', function(done) {
      this.timeout(5e4); // Extend timeout as scaping takes time

      var insertMultipleData = stub(nasaqIndexService, 'insertMultipleData');
      insertMultipleData.onCall(0).resolves(targetData); // Just to force scraping completed

      controller.scrape('file:///' + targetPath)
        .then(function() {
          expect(insertMultipleData.calledWith(targetData)).to.be.true;
          done();
        });
    });
  });

});