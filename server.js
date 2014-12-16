var express = require('express')

var server = express();

server.listen(3000, function () {
  var host = this.address().address;
  var port = this.address().port;
  console.log('Listening at http://%s:%s', host, port);
});