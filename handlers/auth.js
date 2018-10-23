const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {

};

/*
@route	POST /api/auth/register
@desc	Registers a new user and saves it to database
@params	email, username, password, avatar (optional)
@access Public
 */
exports.register = async function(req, res, next) {
	try {
		let newUser = await db.User.create(req.body);
		let {id, username, avatar} = newUser;
		let token = jwt.sign({id, username, avatar}, process.env.SECRET_KEY);
		return res.status(200).json({
			id, username, avatar, token
		});
	} catch (err) {
		// 11000 is the mongoose error code for duplicate entry
		if (err.code === 11000) {
			err.message = 'Sorry, username and/or email is already registered.';
		}
		return next({
			status: 400,
			message: err.message
		});
	}
};