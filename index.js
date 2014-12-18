var server = require('./source/server')
  , db = require('./source/db')
  ;

server.set('port', process.env.PORT || 3030);

db.sequelize.sync().then(function () {
  server.listen(server.get('port'), function () {
    var host = this.address().address;
    var port = this.address().port;
    console.log('Listening at http://%s:%s', host, port);
  })
});