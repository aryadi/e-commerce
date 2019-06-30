const chai = require('chai');
const chaiHTTP = require('chai-http');
const deleteAllUser = require('../helpers/deleteUser');
const deleteAllProduct = require('../helpers/deleteProduct');

const app = require('../app');

const expect = chai.expect;

chai.use(chaiHTTP);

after(function () {
  deleteAllUser();
  deleteAllProduct();
});

let tokenAdmin = '';
let tokenBuyer = '';

let productId = '';

let user = {
  firstName: 'John',
  lastName: 'Doe',
  role: 'Admin',
  email: 'johndoe@gmail.com',
  password: '12345'
}

let product = {
  name: 'Sepatu',
  price: 10000,
  image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description: 'ini sepatu haibis',
  stock: 5
}


describe('Testing for product', function () {
  describe('Create Product testing', function () {
    it('Create user', function (done) {
      chai
        .request(app)
        .post('/users/register')
        .send(user)
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
          email: 'johndoe@gmail.com',
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
          expect(res.body).to.have.property('image');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('stock');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Failed create product, empty name', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send({
          name: '',
          price: 10000,
          image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          description: 'ini sepatu haibis',
          stock: 5
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
    it('Failed create product, price less than 0', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send({
          name: 'sepatu',
          price: -1,
          image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          description: 'ini sepatu haibis',
          stock: 5
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
    it('Failed create product, price inserted with string', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send({
          name: 'sepatu',
          price: '',
          image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          description: 'ini sepatu haibis',
          stock: 5
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
    it('Failed create product, empty image', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send({
          name: 'sepatu',
          price: 0,
          image: "",
          description: 'ini sepatu haibis',
          stock: 5
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
    it('Failed create product, empty description', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send({
          name: 'sepatu',
          price: 0,
          image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          description: '',
          stock: 5
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
    it('Failed create product, stock inserted with string', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send({
          name: 'sepatu',
          price: 0,
          image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          description: 'ini sepatu haibis',
          stock: ''
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
    it('Failed create product, stock is below 0', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenAdmin)
        .send({
          name: 'sepatu',
          price: 0,
          image: "https://images.unsplash.com/photo-1561580781-f3b39f85efec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          description: 'ini sepatu haibis',
          stock: -1
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
    it('Create product with no token, should return status code 401 and object with message property', function (done) {
      chai
        .request(app)
        .post('/products')
        .send(product)
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Not an admin cannot create product, should return status code 401 and object of the product', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', tokenBuyer)
        .send(product)
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  describe('Read Product testing', function () {
    it('read all product by admin, should return array of object and status code 200', function (done) {
      chai
        .request(app)
        .get('/products')
        .set('access_token', tokenAdmin)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('read all product by user, should return array of object and status code 200', function (done) {
      chai
        .request(app)
        .get('/products')
        .set('access_token', tokenBuyer)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  describe('Update Product testing', function () {
    it('Update by admin, should return status code 201 and an object', function (done) {
      
      chai
        .request(app)
        .patch('/products/'+productId)
        .set('access_token', tokenAdmin)
        .send(product)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Update by admin with not all property, should return status code 201 and an object', function (done) {
      chai
        .request(app)
        .patch('/products/'+productId)
        .set('access_token', tokenAdmin)
        .send({
          stock: 4
        })
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Update by user with role buyer, should return status code 401 and an object with message property', function (done) {
      chai
        .request(app)
        .patch('/products/'+productId)
        .set('access_token', tokenBuyer)
        .send({
          stock: 2
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
    it('Update by user with no token, should return status code 401 and an object with message property', function (done) {
      chai
        .request(app)
        .patch('/products/'+productId)
        .send({
          stock: 3
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
  describe('Delete Product testing', function () {
    it('Delete by admin, should return status code 200 and an object', function (done) {
      chai
        .request(app)
        .delete('/products/'+productId)
        .set('access_token', tokenAdmin)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('Delete by user with role buyer, should return status code 401 and an object with message property', function (done) {
      chai
        .request(app)
        .delete('/products/'+productId)
        .set('access_token', tokenBuyer)
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
    it('Delete by user with no token, should return status code 401 and an object with message property', function (done) {
      chai
        .request(app)
        .delete('/products/'+productId)
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
});