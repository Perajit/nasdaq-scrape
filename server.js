var config = require('./app/config');
var apiProcess = require('./app/api/index');
var backgroundProcess = require('./app/background/index');

var mongoose = require('mongoose');
mongoose.connect(config.MONGO_URI);

var app = apiProcess(config);
var job = backgroundProcess(config);
var port = process.env.PORT || config.API_DEFAULT_PORT;

app.listen(port, function () {
  console.log('***** Statred server on port ' + port);
});