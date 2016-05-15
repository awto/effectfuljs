'use strict';
M = require('./mfjscore');
Q = require('Q');
QM = require('@mfjs/promise')(Q);
describe('yop', function () {
    it('should yield fiber until promise is resolved', function (done) {
        function addLater(a, b) {
            var deferred;
            deferred = Q.defer();
            process.nextTick(function () {
                deferred.resolve(a + b);
            });
            return deferred.promise;
        }
        if (done.async)
            done = done.async();
        M.run(QM, function () {
            var result;
            return M(addLater(1, 2)).mapply(function (b) {
                result = b;
                try {
                    expect(result).to.equal(3);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });
    it('should throw reasons from rejected promises into fiber', function (done) {
        function throwErrorLater() {
            var deferred;
            deferred = Q.defer();
            process.nextTick(function () {
                deferred.reject(new Error('promise rejected'));
            });
            return deferred.promise;
        }
        if (done.async)
            done = done.async();
        M.run(QM, function () {
            return M.scope(function (root) {
                return M.coerce(throwErrorLater).mhandle(function (err) {
                    try {
                        expect(err.message).to.equal('promise rejected');
                        done();
                    } catch (expectErr) {
                        done(expectErr);
                    }
                    return root();
                }).mapply(function () {
                    done(new Error('yop should have thrown reason from rejected promise'));
                });
            });
        });
    });
    it('should work just fine with passed a value instead of a promise', function (done) {
        if (done.async)
            done = done.async();
        M.run(QM, function () {
            var result;
            return M(1 + 2).mapply(function (b) {
                result = b;
                try {
                    expect(result).to.equal(3);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });
});