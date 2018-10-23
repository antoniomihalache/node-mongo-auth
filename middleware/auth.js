//load environment variables
require('dotenv').load();
const jwt = require('jsonwebtoken');

//middleware for checking authentication (if you want to create private routes)
exports.isAuthenticated = (req, res, next) => {
	try {
		//token will come in form of 'Bearer 390525932jffofjffo...'
		//so we split after " " and take what's at index 1
		let token = req.headers.authorization.split(' ')[1];
		//decode token
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			//if token is decoded successfully, move on
			if (decoded) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Please log in first!'
				});
			}
		});
	} catch (err) {
		return next({
			status: 401,
			message: 'Please log in first!'
		});
	}
};

//middleware for authorization
//we use this function in routes that are prefixed with /api/users/:id/etc..
//and we compare the id from the decoded token with the id from the route.
exports.checkAuthorization = (req, res, next) => {
	try {
		//get token
		let token = req.headers.authorization.split(' ')[1];
		//try to decode token
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			//if token is decode successfully and ids match, move on
			if (decoded && decoded.id === req.params.id) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Unauthorized'
				});
			}
		});
	} catch (err) {
		return next({
			status: 401,
			message: 'Unauthorized'
		});
	}
};