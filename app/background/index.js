var cron = require('cron');
var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var scraper = require('./scraper');

var background = function(config) {
  var job = new CronJob({
    cronTime: '0 * * * * *',
    onTick: function() {
      scraper.scrape(config.SCRAPE_TARGET);
    },
    start: false,
    timeZone: 'America/Los_Angeles'
  });

  job.start();

  return job;
};

module.exports = background;