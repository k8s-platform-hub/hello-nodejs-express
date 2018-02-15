var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

/*
router.route("/").get(function (req, res) {
  res.send("Hello world from hello-nodejs-express")
})
*/
router.route("/").get(function (req, res) {
  res.render("home");
})

router.route("/examples/data").get(function (req, res) {
  console.log("Get articles");
  //Fetch all rows from table - articles
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 0,
      'X-Hasura-Role': 'anonymous'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'article',
        'columns': [
          '*'
        ]
      }
    })
  }
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }
    // res.json(JSON.parse(body))
    res.render('data', {'data': body});
  })
})

router.route("/examples/auth").get(function (req, res) {
  res.render("auth_user");
})

module.exports = router;
