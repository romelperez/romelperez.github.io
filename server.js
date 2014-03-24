/*!
 * PRHONE Applications
 * Project | Component
 * Romel Pérez, 2014
 **/

// ------------------------------------------------------------------------- //
// SERVER CONFIGURATION //

var port = 4000;

// Modules
var http = require('http');
var express = require('express');
var swig = require('swig');

var app = express();
var server = http.createServer(app);


// Configuration
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(app.router);
app.use(express.static(__dirname + '/public'));


// Run server
server.listen(port, function () {
    console.log('>>> Server listening at port ' + port + '!');
    console.log('>>> Server in mode "' + app.settings.env + '"!');
});



// ------------------------------------------------------------------------- //
// URLs //

app.get('/', function (req, res) {
    res.render('index');
});
