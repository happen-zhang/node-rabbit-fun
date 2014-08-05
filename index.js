
var express = require('express');

require('./rabbit/BaseInit.js');
var ExpressInit = require("./rabbit/ExpressInit.js");
var config = require('./config');

var app = express();
ExpressInit(app);

module.exports = app;
