//load all environment variables
require('dotenv').load();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5500;
const errorHandler = require('./handlers/error');

//import routes
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/api/auth', authRoutes);

//if no route matched, throw 404 error
app.use((req, res, next) => {
	let err = new Error('Page not found!');
	err.status = 400;
	next(err);
});

//catch all errors
app.use(errorHandler);

app.listen(PORT, () => `App is live on port ${PORT}`);