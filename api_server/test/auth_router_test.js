const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const bcrypt = require('bcrypt');
const server = require(__dirname + '/../_server');
const User = require(__dirname + '/../models/user');
var port = process.env.PORT = 4000;
var mongoose = require('mongoose');
process.env.APP_SECRET = 'testsecret';

describe('Auth router', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/auth_test_db', done);
    console.log('server on port ' + port);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should be able to create a user', (done) => {
    request('localhost:' + port)
      .post('/api/signup')
      .send({ email: 'auth@test.com', password: '12345678' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('good signup');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  describe('sign in route', () => {
    before((done) => {
      var userSignin = {
        email: 'newAuth@test.com',
        password: bcrypt.hashSync('authentication', 8)
      };

      User.create(userSignin, done);
    });

    it('should be able to sign in', (done) => {
      request('localhost:' + port)
        .get('/api/signin')
        .auth('newAuth@test.com', 'authentication')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should be refuse access with incorrect password', (done) => {
      request('localhost:' + port)
        .get('/api/signin')
        .auth('newAuth@test.com', 'wrongpassword')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res).to.have.status(401);
          expect(res.body.msg).to.eql('Invalid password!');
          done();
        });
    });

    it('should be refuse access with invalid username', (done) => {
      request('localhost:' + port)
        .get('/api/signin')
        .auth('wrongemail@test.com', 'authentication')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res).to.have.status(401);
          expect(res.body.msg).to.eql('Invalid email!');
          done();
        });
    });
  });
});
