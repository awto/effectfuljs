function a() {
    var b1;
    return M(eff(1)).mbind(function (b) {
        return function (b1) {
            b1 = b;
            return eff('a');
        }(b1);
    }).mbind(function () {
        return eff('b');
    });
}
function a1() {
    var b1;
    return M(eff(1)).mbind(function (b) {
        return function (b1) {
            b1 = b;
            return eff('a');
        }(b1);
    }).mbind(function () {
        return eff('b');
    });
}
function b() {
    var b1, b2;
    return M(eff(1)).mbind(function (b) {
        return function (b1) {
            b1 = b;
            return M(eff(2)).mapply(function (b3) {
                return function (b2) {
                    b2 = b3;
                    return [
                        b1,
                        b2
                    ];
                }(b2);
            });
        }(b1);
    }).mbind(M.spread(function (b1, b2) {
        return M(eff(b1)).mconst(b2);
    })).mbind(eff);
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
        return function (a, b) {
            a = b7;
            b = 2;
            return M(eff(3)).mapply(function (b1) {
                return function (c) {
                    c = b1;
                }(c);
            });
        }(a, b);
    }).mbind(function () {
        return eff('a');
    }).mbind(function () {
        return eff('b');
    }).mbind(function () {
        return M(eff(4)).mbind(function (b2) {
            return function (d, e) {
                d = b2;
                e = 5;
                return M(eff(6)).mapply(function (b3) {
                    return function (f) {
                        f = b3;
                    }(f);
                });
            }(d, e);
        }).mbind(function () {
            return M(eff(7)).mapply(function (b4) {
                return function (g) {
                    g = b4;
                }(g);
            });
        }).mapply(function () {
            return function (j) {
                j = 8;
            }(j);
        });
    }).mbind(function () {
        return M(eff('x')).mbind(function (b5) {
            return function (x, y) {
                x = b5;
                y = 'y';
                return M(eff('z')).mapply(function (b6) {
                    return function (z) {
                        z = b6;
                    }(z);
                });
            }(x, y);
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