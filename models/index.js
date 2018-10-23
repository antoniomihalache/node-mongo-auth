const mongoose = require('mongoose');
//use the native Promise library
mongoose.Promise = Promise;
mongoose.connect('mongodb://testuser:testuser1@ds239873.mlab.com:39873/nodeauth', {
	keepAlive: true,
	useNewUrlParser: true
});

module.exports.User = require('./user');