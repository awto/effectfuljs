module.exports = function (M, it) {
    describe('js control without effects', function () {
        context('with `for` statement', function () {
            it('should have the same semantics as js', function (def) {
                return M(def.run(function () {
                    var i;
                    return M(def.rec('b')).mbind(function () {
                        i = 0;
                        return M.forPar(function (i) {
                            return i < 3;
                        }, function (i) {
                            return def.rec(i);
                        }, function (i) {
                            i++;
                            return i;
                        }, i);
                    }).mbind(function () {
                        return def.rec('a');
                    }).mapply(function () {
                        def.check('b', 0, 1, 2, 'a');
                    });
                })).mapply(function () {
                    def.done();
                });
            });
        });
    });
};