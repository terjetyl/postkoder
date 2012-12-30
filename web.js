var express = require('express'),
    zip = require('./routes/zip');
 
var app = express();

// allow cors requests
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
 
app.get('/zip', zip.findAll);
app.get('/zip/:id', zip.findById);
 
app.listen(process.env.PORT, process.env.IP);
console.log('Listening on port ' + process.env.PORT + '...');