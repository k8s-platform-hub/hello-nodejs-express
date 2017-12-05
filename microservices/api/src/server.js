var express = require('express');
var app = express();
var router = express.Router();

var server = require('http').Server(app);

app.get('/', function(req, res) {
  res.send('Hello World');
});

// Uncomment to add a new route which returns hello world as a JSON
// app.get('/json', function(req, res) {
//   res.json({
//     message: 'Hello world'
//   });
// });

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
