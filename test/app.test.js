'use strict';

const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');

const expect = chai.expect;
const dummyObject = {
  title: 'test',
  content: 'test content'
};


describe('server', () => {
  let personId;
  before((done) => {
    mongoose.connection.db.dropDatabase(done);
  });
  const server = require('../server');
  it('server.js file exists', () => {
    expect(server).to.exist;
  });
  it('POST /person', () => request(server).post('/person')
    .send(dummyObject)
    .expect(200)
    .then(res => {
      personId = res.body._id;
      expect(res.body.title).to.equal(dummyObject.title);
      expect(res.body.content).to.equal(dummyObject.content);
    })
  );
  it('GET /', () => request(server).get('/')
    .expect(200)
    .then(res => {
      expect(res.body).to.be.an('Array');
      expect(res.body[0].title).to.equal(dummyObject.title);
      expect(res.body[0].content).to.equal(dummyObject.content);
    })
  );
  it('GET /person/:id', () => request(server).get(`/person/${personId}`)
    .expect(200)
    .then(res => {
      expect(res.body.title).to.equal(dummyObject.title);
      expect(res.body.content).to.equal(dummyObject.content);
    })
  );
  it('PATCH /person/:id', () => request(server).patch(`/person/${personId}`)
    .send({ title: 'test content' })
    .expect(200)
    .then(res => {
      expect(res.body.title).to.equal('test content');
      expect(res.body.content).to.equal(dummyObject.content);
    })
  );
  it('DELETE /person/:id', () => request(server).delete(`/person/${personId}`).expect(200));
});
