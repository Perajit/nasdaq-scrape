var config = require('./app/config');
var app = require('./app/api/index')();
var job = require('./app/background/index')(config);

// Connect to database
var mongoose = require('mongoose');
mongoose.connect(config.MONGO_URI);

// Start server for API
var port = process.env.PORT || config.API_DEFAULT_PORT;
app.listen(port, function () {
  console.log('***** Started server on port ' + port);
});

// Start background scraping process
job.start();