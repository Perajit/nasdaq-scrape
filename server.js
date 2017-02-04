var config = require('./app/config');
var mongoose = require('mongoose');
var apiProcess = require('./app/api/api.process');
var backgroundProcess = require('./app/background/background.process');

mongoose.connect(config.MONGO_URI);

apiProcess(config);
backgroundProcess(config);