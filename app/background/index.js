var CronJob = require('cron').CronJob;
var controller = require('./controller');

var background = function(config) {
  var job = new CronJob({
    cronTime: '0 * * * * *',
    onTick: function() {
      controller.scrape(config.target);
    },
    start: false,
    timeZone: 'America/Los_Angeles'
  });

  return job;
};

module.exports = background;