var express = require('express');
var app = express();
var routescan = require('express-routescan');

routescan(app);

app.listen('3000');

console.log('-----Listening on port 3000-----');

exports = module.exports = app;
