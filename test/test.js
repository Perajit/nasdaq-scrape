var config = require('./config'); // Config for testing
var app = require('../app/api/index')();
var job = require('../app/background/index')(config);

// Connect to database
var mongoose = require('mongoose');
mongoose.connect(config.MONGO_URI);

// Run tests
require('./services/nasdaqIndex.test');
require('./background/controller.test');
require('./api/index.test')(app, config.API_DEFAULT_PORT);