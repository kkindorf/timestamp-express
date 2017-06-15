var express = require('express');
var hbs = require('express-handlebars');
var moment = require('moment');
var sugar = require('sugar');

var app = express();

app.use(express.static(__dirname + '/public'));

//December%2015,%202015

app.engine('.hbs', hbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res, next) {
  res.render('index', {test:'hello'})
})

app.get('/:time', function(req, res, next) {
  var input = req.params.time,
  blahDate = sugar.Date.create(input),
  validNatural = moment(blahDate).isValid();

  var unix = moment(blahDate).format("X");
  var numUnix = parseInt(unix);
  console.log(moment(numUnix).isValid());

  if(validNatural) {
    var formatted = moment(blahDate).format();
    res.render('index', {naturalLanguageDate: input, unixTimeStamp:unix})
  }
  else if(validUnix) {
    res.render('index', {unixTimeStamp: day})
  }
});

app.listen(3000, function() {
  console.log('app listening on port 3000')
})
