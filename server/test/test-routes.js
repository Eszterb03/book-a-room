const test = require('tape');
const request = require('supertest');
const app = require('../index');

test('GET /rooms', (t) => {
    request(app)
        .get('/rooms')
        .end((err, res) => {
            t.error(err);
            t.equal(typeof res.body.length, 'number', 'response is an array');
            t.end();
        });
});