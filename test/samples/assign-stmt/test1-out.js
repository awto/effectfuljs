function a() {
    var b1;
    return M(eff(1)).mbind(function (b) {
        b1 = b;
        return eff('a');
    }).mbind(function () {
        return eff('b');
    });
}
function a1() {
    var b1;
    return M(eff(1)).mbind(function (b) {
        b1 = b;
        return eff('a');
    }).mbind(function () {
        return eff('b');
    });
}
function b() {
    var b1, b2;
    return M(eff(1)).mbind(function (b) {
        b1 = b;
        return M(eff(2)).mapply(function (b3) {
            b2 = b3;
        });
    }).mbind(function () {
        return eff(b1);
    }).mbind(function () {
        return eff(b2);
    });
}
function b1() {
    var b1, b2;
    return M.arr([
        eff(1),
        eff(2)
    ]).mbind(M.spread(function (b3, b) {
        b1 = b3, b2 = b;
        return eff(b1);
    })).mbind(function () {
        return eff(b2);
    });
}
function c() {
    var a, b, c;
    var d, e, f, g, j;
    var x, y, z;
    return M(eff(1)).mbind(function (b7) {
        a = b7;
        b = 2;
        return M(eff(3)).mapply(function (b1) {
            c = b1;
        });
    }).mbind(function () {
        return eff('a');
    }).mbind(function () {
        return eff('b');
    }).mbind(function () {
        return M(eff(4)).mbind(function (b2) {
            d = b2;
            e = 5;
            return M(eff(6)).mapply(function (b3) {
                f = b3;
            });
        }).mbind(function () {
            return M(eff(7)).mapply(function (b4) {
                g = b4;
            });
        }).mapply(function () {
            j = 8;
        });
    }).mbind(function () {
        return M(eff('x')).mbind(function (b5) {
            x = b5;
            y = 'y';
            return M(eff('z')).mapply(function (b6) {
                z = b6;
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
    ]).mbind(M.spread(function (b1, b) {
        b1.some = b;
        return M.arr([
            eff('b'),
            eff(3)
        ]).mapply(M.spread(function (b3, b2) {
            b3.some += b2;
        }));
    })).mbind(function () {
        return M(eff('c')).mapply(function (b4) {
            b4.some++;
        });
    }).mapply(function () {
        some['d']--;
    });
}