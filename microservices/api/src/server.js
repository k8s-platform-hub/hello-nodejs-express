var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
require('request-debug')(request);

var hasuraExamplesRouter = require('./hasuraExamples');

var server = require('http').Server(app);

router.use(morgan('dev'));

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: {
	    toJSON : function(object) {
	      return JSON.stringify(object, null, 4);
	    }
  	}
	})
);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', hasuraExamplesRouter);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
