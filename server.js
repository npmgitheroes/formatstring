'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var mongoAdapter = require('./mongodb.js');

var app = express();
var server = http.createServer(app);

app.set('port', (process.env.PORT || 9000));

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.route('/format')
    .post(function (req, res) {
        var db = mongoAdapter.getState();
        var data = req.body;
        
         db.collection('data').insert({data: data}, function(){
            res.status(200).send().end();
         });
    });

function startServer() {
    mongoAdapter.connect()
    .then(function(){
        server.listen((process.env.PORT || 9000));
    })
    .catch(function(err) {
        console.log(err);
    })
}

startServer();
