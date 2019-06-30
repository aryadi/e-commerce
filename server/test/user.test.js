const chai = require('chai');
const chaiHTTP = require('chai-http');
const deleteAllUser = require('../helpers/deleteUser');

const app = require('../app');

const expect = chai.expect;

chai.use(chaiHTTP);

after(function() {
  deleteAllUser();
});

let user = {
  firstName: 'John',
  lastName: 'User',
  role: 'Buyer',
  email: 'johnUser@gmail.com',
  password: '12345'
}

describe('Testing for user', function () {
  it('Succesful register, should send object and status code 201', function (done) {
    chai
      .request(app)
      .post('/users/register')
      .send(user)
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('firstName');
        expect(res.body).to.have.property('lastName');
        expect(res.body).to.have.property('role');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('password');
        done();
      })
      .catch((err) => {
        console.log(err);
      })
  });

  it('Succesful login, Should return status code 201 and an object with token in the object', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send({
        email: 'johnUser@gmail.com',
        password: '12345'
      })
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('access_token');
        done();
      })
      .catch((err) => {
        console.log(err);
      })
  });

  it('Register failed email already registered, should return status code 422 and object with message property', function (done) {
    chai
      .request(app)
      .post('/users/register')
      .send(user)
      .then(function (res) {
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((err) => {
        console.log(err);
      })
  });

  it('Login failed incorrect password, should return status code 401 and object with message property', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send({
        email: 'johnUser@gmail.com',
        password: '2345'
      })
      .then(function (res) {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((err) => {
        console.log(err);
      })
  });
})