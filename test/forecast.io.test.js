const assert = require('assert');
const forecast = require('../services/forecast.io');

describe('Unit test ripley jcocana', function () {

    it('should return an array', function (done) {
        this.timeout(60000);
        forecast((data) => {
            assert.strictEqual(Array.isArray(data), true);
            done();
        });
    });

    it('should return an array with length 6', function (done) {
        this.timeout(60000);
        forecast((data) => {
            assert.strictEqual(data.length, 6);
            done();
        });
    });

    it('should return an array with first equal santiago', function (done) {
        this.timeout(60000);
        forecast((data) => {
            assert.strictEqual(data[0]['timezone'], 'America/Santiago');
            done();
        });
    });

    after(() => {
        process.exit();
    });
});