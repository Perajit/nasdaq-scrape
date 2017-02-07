var config = require('./config/default');
var app = require('./app/api/index')();
var job = require('./app/background/index')(config);

// Connect to database
var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

// Start server for API
app.listen(config.port, function () {
  console.log('***** Started server on port ' + config.port);
});

// Start background scraping process
job.start();