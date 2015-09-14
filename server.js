var express = require('express');
var app = express();
var port = process.env.PORT || 9000;

app.use(express.static(__dirname));

app.listen(port, function (err) {
  if (err) throw err;
  console.log('Servidor corriendo en http://127.0.0.1:'+ port);
});
