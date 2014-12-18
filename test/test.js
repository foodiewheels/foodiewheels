var supertest = require('supertest');

describe('Foodie Wheels REST API Tests', function () {
  var server;

  before(function (done) {
    require('../source/server')(function (err, app) {
      if (err) throw err;
      server = app;
      done();
    })
  });

  it('POST register a new user account', function (done) {
    var request = {
      "username": "testuser",
      "password": "testpassword"
    };
    supertest(server)
      .post('/user/register')
      .send(request)
      .expect(200, done)
    ;
  });

  it('POST login to a user account', function (done) {
    var request = {
      "username": "testuser",
      "password": "testpassword"
    };
    supertest(server)
      .post('/user/login')
      .send(request)
      .expect(200, done)
    ;
  });

  it('DELETE a user account', function (done) {
    supertest(server)
      .delete('/user/testuser')
      .expect(200, done)
    ;
  });

});