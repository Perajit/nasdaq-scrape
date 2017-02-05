var expect  = require("chai").expect;
var scraper = require('../../app/background/scraper');
var targetData = require('../fixtures/target');

describe('Background scraper', function() {
  var targetUrl = '../fixtures/target.html';

  describe('extractData', function() {
    it('should extract data from content correctly', function(done) {
      var targetPath = require('path').resolve(__dirname + '/' + targetUrl);
      require('fs').readFile(targetPath, 'utf-8', function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        var actualData = scraper.extractData(content);
        expect(actualData).to.eql(targetData);
        done();
      });
    });
  });
});