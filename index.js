require('./lib/server')(function (error, server) {
  if (error) throw error;
  server.listen(server.get('port'), function () {
    var host = this.address().address;
    var port = this.address().port;
    console.log('Listening at http://%s:%s', host, port);
  })
});