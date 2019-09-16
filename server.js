
const express = require("express"),
  
  mongoose = require("mongoose"),

  mongojs = require("mongojs"),

  request = require("request"),

  bodyParser = require("body-parser"),

  exphbs = require("express-handlebars"),
 
  morgan = require('morgan'),
  logger = require('./logger'),
 
  cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname +'/public'));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode < 400
  }, stream: process.stderr
}));

app.use(router);

app.listen(PORT, function () {
  console.log('Running on port: ' + PORT);
});

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

