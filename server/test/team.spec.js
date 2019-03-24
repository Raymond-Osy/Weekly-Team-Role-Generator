const chai = require('chai');
const request = require('supertest');
const app = require('../app.js');

const agent = request(app);

chai.should();

describe('Team API', () => {
    describe('GET all team members', () => {
        it('should return a list of team members', (done) => {
            agent.get('/api/users')
              .expect(200, done);
        })

        it('should return a single team member', (done) => {
            agent.get('/api/users/1')
              .expect(200, done);
        })
    })

    describe('Update team members', () => {
        it('should update the status of a team member', (done) => {
            agent.patch('/api/users/1')
              .send({
                  served: true,
              })
              .expect(200)
              .end((err, res) => {
                  res.body.data[0].served.should.equal(true);
                  done();
              })
        })
    })
})