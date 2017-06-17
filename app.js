var express = require('express');
var hbs = require('express-handlebars');
var moment = require('moment');
var sugar = require('sugar');

var app = express();
var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));

//December%2015,%202015

app.engine('.hbs', hbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res, next) {
  var instructions = "Hi There. To get this app working just enter a value for a date like this: <code>December%2015,%202015</code> <br><br><br>You can also enter a unix timestamp similar to this <code>1450137600</code> and you'll receive the formatted date back!"
  res.render('index', {instructions:instructions})
})

app.get('/:time', function(req, res, next) {
  var input = req.params.time,
  blahDate = sugar.Date.create(input),
  validNatural = moment(blahDate).isValid();


  var numUnix = parseInt(input);
  var validUnix = moment(numUnix).isValid();


  if(validNatural) {
    var formatted = moment(blahDate).format();
    var unix = moment(blahDate).format("X");
    res.render('index', {naturalLanguageDate: input, unixTimeStamp: unix})
  }
  else if (validUnix) {
    var formatted = moment.unix(numUnix).format("MMMM DD, YYYY");
    res.render('index', {naturalLanguageDate: formatted, unixTimeStamp: numUnix})

  }
  else {
    res.render('index', {naturalLanguageDate: 'null'})
  }


});

app.listen(port, function() {
  console.log('app listening on port 3000')
})
