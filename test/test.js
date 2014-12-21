var supertest = require('supertest');

describe('Foodie Wheels REST API Tests', function () {
  var server
    , agent
    ;

  before(function (done) {
    require('../source/server')(function (err, app) {
      if (err) throw err;
      server = app;
      agent = supertest.agent(server);
      done();
    })
  });

  it('POST register a new user account', function (done) {
    var request = {
      "username": "testuser",
      "email": "email@test.com",
      "password": "testpassword"
    };
    agent
      .post('/api/v1/users')
      .send(request)
      .expect(200, done)
    ;
  });

  it('POST login to a user account', function (done) {
    var request = {
      "username": "testuser",
      "email": "email@test.com",
      "password": "testpassword"
    };
    agent
      .post('/api/v1/login')
      .send(request)
      .expect(200, done)
    ;
  });

  it('POST logout from a user accout', function (done) {
    agent
      .post('/api/v1/logout')
      .expect(200, done)
    ;
  });

  it('POST register an account to delete', function (done) {
    var request = {
      "username": "testdeleteuser",
      "email": "email@test.com",
      "password": "testpassword"
    };
    agent
      .post('/api/v1/users')
      .send(request)
      .expect(200, done)
    ;
  });

  it('DELETE a user account', function (done) {
    agent
      .delete('/api/v1/users/testdeleteuser')
      .expect(200, done)
    ;
  });

});