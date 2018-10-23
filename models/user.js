const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	avatar: {
		type: String
	},
	password: {
		type: String,
		required: true
	}
});

//hash password before save
userSchema.pre('save', async function(next) {
	try {
		//if password wasn't modified, move on to the next middleware
		if (!this.isModified('password')) {
			return next();
		}
		//else hash the password and save it to the user
		let hashedPassowrd = await bcrypt.hash(this.password, 10);
		this.password = hashedPassowrd;
		return next();
	} catch (err) {
		return next(err);
	}
});

//middleware for comparing received password with the one in the database
//this method will be available on all users created with this schema
userSchema.methods.comparePassword = async function(password, next) {
	try {
		//this method will return the isMatch variable in boolean
		let isMatch = await bcrypt.compare(password, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

const User = mongoose.model('User', userSchema);
module.exports = User;