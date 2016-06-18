function a() {
    return M(eff(1), 1).mbind(function () {
        return eff(2);
    }, 2);
}
function b() {
    var i;
    i = 0;
    return M.forPar(function (i) {
        return i < 10;
    }, function (i) {
        return M(eff(i), 3).mbind(function () {
            return eff(i);
        }, 4);
    }, function (i) {
        i++;
        return i;
    }, i, 5).mbind(function (i) {
        return M(eff(1), 13).mbind(function (b) {
            var _i1 = i;
            _i1 = b;
            return M.block(function (brk1) {
                return M.repeat(function (i) {
                    return M(eff(i++), 7).mbind(function (b1) {
                        var _i = i;
                        if (_i < b1)
                            return M(eff(_i++), 6).mconst(_i);
                        else
                            return brk1();
                    }, 8).mbind(function (i) {
                        return M(eff(i), 9).mconst(i);
                    }, 10);
                }, _i1, 11);
            }, 12);
        }, 14);
    }, 15);
}
function c() {
    return M.scope(function (root) {
        return M(eff(1)).mbind(function (b) {
            if (b)
                return M(eff(2)).mbind(root);
        }).mbind(function () {
            return eff(3);
        }).mbind(function () {
            return M(eff(4)).mbind(root);
        });
    }, 16);
}
function d() {
    return M(eff(1), 'm17').mbind(function () {
        return eff(2);
    }, 'm18');
}