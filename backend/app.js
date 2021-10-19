var express = require('express'),
	errorhandler = require('errorhandler'),
	cors = require('cors'),
	mongoose = require('mongoose')

require('dotenv').config({ path: './config/config.env' });

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(errorhandler());

mongoose.connect(process.env.DB_MONGO_URI);
mongoose.set('debug', true);

require('./models/User');
require('./models/Comment');
require('./models/Game');
require('./config/passport');

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		'errors': {
			message: err.message,
			error: {}
		}
	});
});

var server = app.listen(process.env.PORT || 4000, function () {
	console.log('Listening on port ' + server.address().port);
});