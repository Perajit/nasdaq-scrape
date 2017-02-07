var config = require('../config/test'); // Config for testing
var app = require('../app/api/index')();
var job = require('../app/background/index')(config);

// Connect to database
var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

// Run tests
require('./services/nasdaqIndex.test');
require('./background/controller.test');
require('./api/index.test')(app, config.port);
require('./background/index.test')(job, config.target);