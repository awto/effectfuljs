function a() {
    var b1;
    return M(eff(1)).mbind(function (b) {
        var _b1;
        _b1 = b;
        return eff('a');
    }).mbind(function () {
        return eff('b');
    });
}
function a1() {
    var a;
    return M(eff(1)).mbind(function (b) {
        var _a;
        _a = b;
        return eff('a');
    }).mbind(function () {
        return eff('b');
    });
}
function b() {
    var b1, b2;
    return M(eff(1)).mbind(function (b) {
        var _b1;
        _b1 = b;
        return M(eff(2)).mapply(function (b3) {
            var _b2;
            _b2 = b3;
            return [
                _b1,
                _b2
            ];
        });
    }).mbind(function (a) {
        var b1 = a[0], b2 = a[1];
        return M(eff(b1)).mconst(b2);
    }).mbind(eff);
}
function b1() {
    var a, c;
    return M.arr([
        eff(1),
        eff(2)
    ]).mbind(function (a1) {
        var b1 = a1[0], b = a1[1];
        a = b1, c = b;
        return eff(a);
    }).mbind(function () {
        return eff(c);
    });
}
function c() {
    var a, b, c;
    var d, e, f, g, j;
    var x, y, z;
    return M(eff(1)).mbind(function (b1) {
        var _a, _b;
        _a = b1;
        _b = 2;
        return M(eff(3)).mapply(function (b2) {
            var _c;
            _c = b2;
        });
    }).mbind(function () {
        return eff('a');
    }).mbind(function () {
        return eff('b');
    }).mbind(function () {
        return M(eff(4)).mbind(function (b3) {
            var _d, _e;
            _d = b3;
            _e = 5;
            return M(eff(6)).mapply(function (b4) {
                var _f;
                _f = b4;
            });
        }).mbind(function () {
            return M(eff(7)).mapply(function (b5) {
                var _g;
                _g = b5;
            });
        }).mapply(function () {
            var _j;
            _j = 8;
        });
    }).mbind(function () {
        return M(eff('x')).mbind(function (b6) {
            var _x, _y;
            _x = b6;
            _y = 'y';
            return M(eff('z')).mapply(function (b7) {
                var _z;
                _z = b7;
            });
        });
    }).mbind(function () {
        return eff(9);
    }).mbind(function () {
        return eff(10);
    });
}
function d() {
    return M.arr([
        eff1('a'),
        eff(2)
    ]).mbind(function (a) {
        var b1 = a[0], b = a[1];
        b1.some = b;
        return M.arr([
            eff('b'),
            eff(3)
        ]).mapply(function (a) {
            var b3 = a[0], b2 = a[1];
            b3.some += b2;
        });
    }).mbind(function () {
        return M(eff('c')).mapply(function (b4) {
            b4.some++;
        });
    }).mapply(function () {
        some['d']--;
    });
}