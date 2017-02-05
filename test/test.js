var config = require('./config'); // Config for testing

var mongoose = require('mongoose');
mongoose.connect(config.MONGO_URI);

require('./services/nasdaqIndex.test');
require('./api/index.test')(config);