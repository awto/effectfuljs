function a() {
    return M(eff('a')).mbind(function () {
        return monadish;
    }).mbind(function () {
        return eff(1);
    }).mbind(function () {
        return monadish + 2;
    }).mapply(function () {
        console.log(M.reify(function () {
            return M(eff(1)).mbind(function () {
                return eff(2);
            });
        }));
    });
}
function b() {
    function addLater(a, b) {
        var deferred;
        deferred = Q.defer();
        process.nextTick(function () {
            deferred.resolve(a + b);
        });
        return deferred.promise;
    }
    M.reify(function () {
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
    }).done();
}