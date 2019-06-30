const chai = require('chai');
const chaiHTTP = require('chai-http');
const deleteAllUser = require('../helpers/deleteUser');
const deleteAllProduct = require('../helpers/deleteProduct');
const deleteAllCart = require('../helpers/deleteCart');

const app = require('../app');

const expect = chai.expect;

chai.use(chaiHTTP);

after(function () {
  deleteAllUser();
  deleteAllProduct();
  deleteAllCart();
});

let tokenAdmin = '';
let tokenBuyer = '';

let productId = '';
let userId = '';
let cartId = '';

let user = {
  firstName: 'Ninja',
  lastName: 'Hatori',
  role: 'Buyer',
  email: 'hatori@gmail.com',
  password: '12345'
}

let admin = {
  firstName: 'Nohara',
  lastName: 'Shinosuke',
  role: 'Admin',
  email: 'shincan@gmail.com',
  password: '12345'
}

let product = {
  name: 'Sepatu',
  price: 10000,
  image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description: 'ini sepatu haibis',
  stock: 5
}

describe('Testing for Cart', function () {

  describe('Register User and create product', function() {
    it('Create user', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(function (res) {
          userId = res.body._id;
          done()
        })
        .catch((err) => {
          console.log(err);
        })
    });

    it('User login', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'hatori@gmail.com',
          password: '12345'
        })
        .then(function (res) {
          tokenBuyer = res.body.access_token;
          
          done();
        })
        .catch((err) => {
          console.log(err);
        })
    })
    it('Create user', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send(admin)
        .then(function (res) {
          done()
        })
        .catch((err) => {
          console.log(err);
        })
    });

    it('User login', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'shincan@gmail.com',
          password: '12345'
        })
        .then(function (res) {
          tokenAdmin = res.body.access_token;
          done();
        })
        .catch((err) => {
          console.log(err);
        })
    })
    it('Successful create product, should return status code 201 and object of the product', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send(product)
        .then(function (res) {
          expect(res).to.have.status(201);
          productId = res.body._id;
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('stock');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  

  describe('Create Cart testing', function () {
    it('User succesfully create cart, should return status code 201 and object of the product', function (done) {
      chai
        .request(app)
        .post('/carts')
        .set('access_token', tokenBuyer)
        .send({
          productId: productId,
          userId: userId,
          quantity: 1
        })
        .then(function (res) {
          cartId = res.body.cartId;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('productId');
          expect(res.body).to.have.property('userId');
          expect(res.body).to.have.property('quantity');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Failed to create cart, invalid productId input', function (done) {
      chai
        .request(app)
        .post('/carts')
        .set('access_token', tokenBuyer)
        .send({
          productId: '12345',
          userId: userId,
          quantity: 1
        })
        .then(function (res) {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('message');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Failed to create cart, empty productId input', function (done) {
      chai
        .request(app)
        .post('/carts')
        .set('access_token', tokenBuyer)
        .send({
          productId: '',
          userId: userId,
          quantity: 1
        })
        .then(function (res) {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('message');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Failed to create cart, quantity less than 1', function (done) {
      chai
        .request(app)
        .post('/carts')
        .set('access_token', tokenBuyer)
        .send({
          productId: '',
          userId: userId,
          quantity: -1
        })
        .then(function (res) {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('message');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Failed to create cart, empty user ID', function (done) {
      chai
        .request(app)
        .post('/carts')
        .set('access_token', tokenBuyer)
        .send({
          productId: productId,
          userId: '',
          quantity: 0
        })
        .then(function (res) {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('message');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Cart created without access token, should return status code 401 and object with property of message', function (done) {
      chai
        .request(app)
        .post('/carts')
        .send({
          productId: productId,
          userId: userId,
          quantity: 1
        })
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Unauthenticated user');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Not a buyer create cart, should return status code 401 and object with property of message', function (done) {
      chai
        .request(app)
        .post('/carts')
        .set('access_token', tokenAdmin)
        .send({
          productId: productId,
          userId: userId,
          quantity: 1
        })
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Unauthenticated user');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  describe('Delete Cart testing', function () {
    it('Delete by buyer, should return status code 200 and an object', function (done) {
      chai
        .request(app)
        .delete('/carts/'+cartId)
        .set('access_token', tokenBuyer)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Delete by user with no token, should return status code 401 and an object with message property', function (done) {
      chai
        .request(app)
        .delete('/carts/'+cartId)
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Unauthenticated user');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Delete by user with role admin, should return status code 401 and an object with message property', function (done) {
      chai
        .request(app)
        .delete('/carts/'+cartId)
        .set('access_token', tokenAdmin)
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Unauthenticated user');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
});