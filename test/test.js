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

    it('GET a single menu from a food truck', function (done) {
      agent
        .get('/api/v1/trucks/testfoodtruck/menus/bestfoodever')
        .expect(200, done)
      ;
    });

    it('GET all menus from a food truck', function (done) {
      agent
        .get('/api/v1/trucks/testfoodtruck/menus')
        .expect(200, done)
      ;
    });

    it('PUT changes to a menu', function (done) {
      var request = {
        "title": "worstfoodever",
        "description": "mmmm",
        "items": '{"menu": "yup a menu"}',
        "active": true
      };
      agent
        .put('/api/v1/trucks/testfoodtruck/menus/bestfoodever')
        .send(request)
        .expect(200, done)
      ;
    });

    it('DELETE a menu', function (done) {
      agent
        .delete('/api/v1/trucks/testfoodtruck/menus/worstfoodever')
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

  describe('GEOGRAPHY Tests', function () {

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
/*
    it('POST a current location', function (done) {
      var request = {
        "address": "123 Fake St",
        "state": "AZ",
        "city": "Tucson",
        "county": "Pima",
        "zipcode": 85716,
        "lat": 32.215766,
        "lng": -110.924660,
        "active": true
      };
    });

    it('PUT updates to a current location', function (done) {

    });

    it('DELETE a current location', function (done) {

    });

    it('POST a new route', function (done) {

    });

    it('PUT updates to a route', function (done) {

    });

    it('DELETE a route', function (done) {

    });

    it('GET all truck locations', function (done) {

    });

    it('GET a truck location', function (done) {

    });
*/
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

});