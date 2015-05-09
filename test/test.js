var supertest = require('supertest');

describe('Foodie Wheels REST API Tests', function () {
  var server
    , agent
    ;

  before(function (done) {
    require('../lib/server')(function (err, app) {
      if (err) throw err;
      server = app;
      agent = supertest.agent(server);
      done();
    })
  });

  describe('USER Tests', function () {

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

    it('PUT user account changes', function (done) {
      var request = {
        "username": "testuser",
        "email": "updated_email@test.com",
        "password": "testpassword"
      };
      agent
        .put('/api/v1/users/testuser')
        .send(request)
        .expect(200, done)
      ;
    });

    it('DELETE a user account', function (done) {
      var request = {
        "username": "testuser",
        "email": "updated_email@test.com",
        "password": "testpassword"
      };
      agent
        .delete('/api/v1/users/testuser')
        .send(request)
        .expect(200, done)
      ;
    });

  });

  describe('TRUCK Tests', function () {

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

    it('POST a new food truck', function (done) {
      var request = {
        "name": "testfoodtruck",
        "description": "This is a test food truck",
        "owners": '{"owners": ["testuser"]}',
        "phone": "1234567890",
        "email": "testfoodtruck@test.com",
        "website": "www.testfoodtruck.com",
        "active": true
      };
      agent
        .post('/api/v1/trucks')
        .send(request)
        .expect(200, done)
      ;
    });

    it('GET a single food truck', function (done) {
      agent
        .get('/api/v1/trucks/testfoodtruck')
        .expect(200, done)
      ;
    });

    it('PUT changes to food truck', function (done) {
      var request = {
        "name": "updated_testfoodtruck",
        "description": "This is a test food truck",
        "owners": '{"owners": ["testuser"]}',
        "phone": "1234567890",
        "email": "testfoodtruck@test.com",
        "website": "www.testfoodtruck.com",
        "active": true
      };
      agent
        .put('/api/v1/trucks/testfoodtruck')
        .send(request)
        .expect(200, done)
      ;
    });

    it('GET all the food trucks', function (done) {
      agent
        .get('/api/v1/trucks')
        .expect(200, done)
      ;
    });

    it('DELETE a food truck', function (done) {
      agent
        .delete('/api/v1/trucks/updated_testfoodtruck')
        .expect(200, done)
      ;
    });

    it('DELETE a user account', function (done) {
      var request = {
        "username": "testuser",
        "email": "email@test.com",
        "password": "testpassword"
      };
      agent
        .delete('/api/v1/users/testuser')
        .send(request)
        .expect(200, done)
      ;
    });

  });

  describe('MENU Tests', function () {

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

    it('POST a new food truck', function (done) {
      var request = {
        "name": "testfoodtruck",
        "description": "This is a test food truck",
        "owners": '{"owners": ["testuser"]}',
        "phone": "1234567890",
        "email": "testfoodtruck@test.com",
        "website": "www.testfoodtruck.com",
        "active": true
      };
      agent
        .post('/api/v1/trucks')
        .send(request)
        .expect(200, done)
      ;
    });

    it('POST a new menu', function (done) {
      var request = {
        "title": "bestfoodever",
        "description": "mmmm",
        "items": '{"menu": "yup a menu"}',
        "active": true
      };
      agent
        .post('/api/v1/trucks/testfoodtruck/menus')
        .send(request)
        .expect(200, done)
      ;
    });

    it('DELETE a food truck', function (done) {
      agent
        .delete('/api/v1/trucks/testfoodtruck')
        .expect(200, done)
      ;
    });

    it('DELETE a user account', function (done) {
      var request = {
        "username": "testuser",
        "email": "email@test.com",
        "password": "testpassword"
      };
      agent
        .delete('/api/v1/users/testuser')
        .send(request)
        .expect(200, done)
      ;
    });

  });

/*
  it('DELETE a menu', function (done) {
    agent
      .delete('/api/v1/trucks/updated_testfoodtruck/menus/bestfoodever')
      .expect(200, done)
    ;
  });

  // Needs to come after menus, menus belong to trucks
  it('DELETE a food truck', function (done) {
    agent
      .delete('/api/v1/trucks/updated_testfoodtruck')
      .expect(200, done)
    ;
  })

  // Needs to come last, test require user auth to pass
  it('DELETE a user account', function (done) {
    agent
      .delete('/api/v1/users/testuser')
      .expect(200, done)
    ;
  });
*/

});