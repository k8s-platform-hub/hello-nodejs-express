var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

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
      'X-Hasura-User-Id': '0',
      'X-Hasura-Role': 'anonymous'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'article',
        'columns': [
          'id',
          'author_id',
          'rating',
          'title'
        ],
        'limit': 10
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
    res.render('data', {'data': JSON.parse(body)});
  })
})

router.route("/examples/auth").get(function (req, res) {
  const baseDomain = req.headers['x-hasura-base-domain'];
  // check if logged in user or not
  if (req.headers['x-hasura-allowed-roles'].includes("anonymous")) {
    res.render("auth_anonymous", {'base_domain': baseDomain});
  } else {
    res.render("auth_user", {'base_domain': baseDomain, 'user_id': req.headers['x-hasura-user-id'], 
      'roles': req.headers['x-hasura-allowed-roles']});
  }
})

router.route("/examples/filestore").get(function (req, res) {
  const baseDomain = req.headers['x-hasura-base-domain'];
  // check if logged in user or not
  if (req.headers['x-hasura-allowed-roles'].includes("anonymous")) {
    res.render("filestore_anonymous", {'base_domain': baseDomain});
  } else {
      requestPayload = {
            "type": "select",
            "args": {
                "table": {
                    "name": "hf_file",
                    "schema": "hf_catalog"
                },
                "columns": [ "*" ],
                "where": {"user_id": req.headers['x-hasura-user-id']}
            }
      }
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': '1',
      'X-Hasura-Role': 'admin'
    },
    body: JSON.stringify(requestPayload)
  };
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    } else {
      res.render("filestore_user", {'base_domain': baseDomain, 'files': JSON.parse(body), 'filesLength': JSON.parse(body).length});
    }
  })


  }
})

module.exports = router;
