var test = function(job, target) {
  describe('Background', function() {
    var expect  = require("chai").expect;
    var useFakeTimers = require('sinon').useFakeTimers;
    var stub = require('sinon').stub;
    var controller = require('../../app/background/controller');

    describe('Process', function() {
      var period = 60 * 1000; // 1 min
      var expectedCount = 10;
      var actualCount;
      var clock;
      var scrape;

      before(function() {
        actualCount = 0;
        clock = useFakeTimers();
        scrape = stub(controller, 'scrape', function(target) {
          ++actualCount;
        });

        job.start();
        clock.tick(period * expectedCount);
      });

      after(function() {
        job.stop();
        scrape.restore();
        clock.restore();
      });

      it('should run scraping job every min', function () {
        expect(actualCount).to.equal(expectedCount);
      });

      it('should scrape target correctly', function () {
        for (var i = 0; i < expectedCount; ++i) {
          expect(scrape.getCall(i).calledWith(target)).to.be.true;
        }
      });
    });
  });
};

module.exports = test;