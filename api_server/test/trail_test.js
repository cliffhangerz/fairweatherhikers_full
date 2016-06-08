const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;
const server = require(__dirname + '/../_server');
const Trail = require(__dirname + '/../models/trail');
const User = require(__dirname + '/../models/user');

process.env.APP_SECRET = 'testsecret';

process.on('exit', () => {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase();
  }
});

describe('Trail Routing test', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/trails_test_db', done);
    console.log('server on port ' + port);
  });

  before((done) => {
    var user = new User({ email: 'beargrylls@email.com', password: 'huckleberry' });
    user.save((err, data) => {
      if (err) throw err;
      this.user = data;
      data.generateToken((err, token) => {
        if (err) throw err;
        this.token = token;
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should post a new trail', (done) => {
    request('localhost:' + port)
    .post('/api/trails/')
    .set('token', this.token)
    .send({ trailName: 'Test Trail',
            lat: 47.2110,
            lon: 122.3220,
            difficulty: 'easy',
            length: 5,
            time: 2
          })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.trailName).to.eql('Test Trail');
      expect(res.body.lat).to.eql(47.2110);
      expect(res.body.lon).to.eql(122.3220);
      expect(res.body.difficulty).to.eql('easy');
      expect(res.body.length).to.eql('5');
      expect(res.body.time).to.eql(2);
      done();
    });
  });

  describe('Tests that need data in the database', () => {
    beforeEach((done) => {
      var newTrail = new Trail({ trailName: 'Appalachian' });
      newTrail.save((err, data) => {
        if (err) return errorHandler(err, data);
        this.testTrail = data;
        done();
      });
    });

    afterEach((done) => {
      this.testTrail.remove(() => {
        done();
      });
    });

    it('should be able to PUT data for a trail', (done) => {
      request('localhost:' + port)
      .put('/api/trails/' + this.testTrail._id)
      .set('token', this.token)
      .send({ trailName: 'Appalachian',
              lat: 47.13245,
              lon: 123.6370,
              dificulty: 'easy',
              length: '32',
              time: 4
            })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('You have changed trail information');
        done();
      });
    });

    it('should DELETE a trail', (done) => {
      request('localhost:' + port)
      .delete('/api/trails/' + this.testTrail._id)
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Trail Deleted');
        done();
      });
    });
  });

  describe('the GET method', () => {
    it('should get all the trails', (done) => {
      var token = this.token;
      request('localhost:' + port)
      .get('/api/trails')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
  });
});
