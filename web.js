var express = require('express'),
    zip = require('./routes/zip');
 
var app = express();
 
app.get('/zip', zip.findAll);
app.get('/zip/:id', zip.findById);
 
app.listen(process.env.PORT, process.env.IP);
console.log('Listening on port ' + process.env.PORT + '...');