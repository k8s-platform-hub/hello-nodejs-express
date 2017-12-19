var express = require('express');
var app = express();
var router = express.Router();
var fetchAction =  require('fetch');
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

// Uncomment to add a new route which fetches all the rows from the article table in the Hasura database and returns that as a JSON array
// app.get('/get_articles', function(req, res) {
//
//   var url = "https://data.hasura/v1/query";
//
//   var requestOptions = {
//       "method": "POST",
//       "headers": {
//           "Content-Type": "application/json",
//           "X-Hasura-Role": "admin",
//           "X-Hasura-User-Id":  1
//       }
//   };
//
//   var body = {
//       "type": "select",
//       "args": {
//           "table": "article",
//           "columns": [
//               "*"
//           ]
//       }
//   };
//
//   requestOptions.body = JSON.stringify(body);
//
//   fetchAction(url, requestOptions)
//   .then(function(response) {
//   	return response.json();
//   })
//   .then(function(result) {
//   	console.log(result);
//     res.json(result);
//   })
//   .catch(function(error) {
//   	console.log('Request Failed:' + error);
//     res.status(500).json({
//           'error': error,
//           'message': 'Select request failed'
//         });
//   });
// });

app.get('/logged_in_user', function(req, res) {
  if (req['X-Hasura-User-Id']) {
    res.json({
      message: 'Welcome, logged in user !',
      userId: req['X-Hasura-User-Id']    
    })
    return;
  }
  res.redirect('https://auth.' + process.env.CLUSTER_NAME + '.hasura-app.io/ui');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
