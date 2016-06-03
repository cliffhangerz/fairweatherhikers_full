const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const mongoose = require('mongoose');
const User = require(__dirname + '/../models/user');

describe('random user find hash', () => {
  before(function(done) {
    mongoose.connect('mongodb://localhost/rand_user_hash_test');
    var newUser = new User({ email: 'hashtest@gmail.com', password: 'hashtest' });
    newUser.save((err, data) => {
      if (err) throw err;
      this.user = data;
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });

  it('should be able to create a random hash', function(done) {
    this.user.generateFindHash((err, hash) => {
      expect(err).to.eql(null);
      expect(hash.length).to.not.eql(0);
      expect(hash).to.eql(this.user.findHash);
      done();
    });
  });
});
