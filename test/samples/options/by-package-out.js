M = require('../../src/lib');
CC = require('../../src/cont1');
function a() {
    var CC, M, run;
    var ti;
    ti = function () {
        return M.arr([
            CC.pushSubCont(k, false),
            CC.pushSubCont(k, true)
        ]).mapply(function (a) {
            var b1 = a[0], b = a[1];
            return (b1 + b ? 3 : 4) + 2;
        });
    };
}
var run = function () {
    console.log(M.run(CC, function () {
        return CC.reset(function (p) {
            return CC.pushPrompt(p, function () {
                return CC.withSubCont(p, function (k) {
                    return M.arr([
                        CC.pushSubCont(k, false),
                        CC.pushSubCont(k, true)
                    ]).mapply(function (a) {
                        var b1 = a[0], b = a[1];
                        return b1 + b;
                    });
                }).mapply(function (b) {
                    return b ? 3 : 4;
                });
            });
        }).mapply(function (b) {
            return b + 2;
        });
    }));
};