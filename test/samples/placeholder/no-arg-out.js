function a() {
    var n = M.reify(function () {
    });
    return n.eff(1);
}
function b() {
    var n = M.reify(function () {
        var n1 = M.reify(function () {
            return eff(1);
        });
        return n1.eff(2);
    });
    return n.eff(3);
}
function c() {
    var n = M.reify(function () {
        return M(eff(1)).mbind(function () {
            return eff(2);
        });
    });
    return M(n.eff(3)).mbind(function () {
        return eff(4);
    });
}
function d() {
    var n = M.reify(function () {
        var n1 = M.reify(function () {
            return M(eff(1)).mbind(function () {
                return eff(2);
            });
        });
        return M(n1.eff(3)).mbind(function () {
            return eff(4);
        });
    });
    return M(n.eff(5)).mbind(function () {
        return eff(6);
    });
}
function e() {
    var k;
    var n = M.reify(function () {
        return M(eff(1)).mbind(function () {
            return eff(2);
        });
    });
    return M.arr([
        n.eff(3),
        n.eff(4)
    ]).mbind(M.spread(function (b1, b) {
        k = b1 + b;
        return eff(5);
    }));
}
function f() {
    var n1 = M.reify(function () {
        return M(eff(1)).mbind(function () {
            var n = M.reify(function () {
                return M(eff(2)).mbind(function () {
                    return eff(3);
                });
            });
            return n.eff(4);
        }).mbind(function () {
            return eff(5);
        });
    });
    return n1.eff(6);
}
function g() {
    var i;
    var n = M.reify(function () {
        var n1 = M.reify(function () {
            return M(eff1(i)).mbind(function () {
                i++;
                return eff2(i);
            });
        });
        return M(n1.eff3(i)).mbind(function () {
            i++;
            return eff4(i);
        });
    });
    return M(n.eff5(i)).mbind(function () {
        return eff6(i);
    });
}
function g1() {
    var i, j;
    return M(eff1(i, j)).mbind(function () {
        return function (j) {
            j++;
            var n = M.reify(function () {
                var n1 = M.reify(function () {
                    return M(eff(i, j)).mbind(function () {
                        i++;
                        return eff2(i, j);
                    });
                });
                return M(n1.eff3(i, j)).mbind(function () {
                    i++;
                    return eff4(i, j);
                });
            });
            return M(n.eff5(i, j)).mbind(function () {
                return function (j) {
                    j++;
                    return M(eff(i, j)).mconst(j);
                }(j);
            });
        }(j);
    }).mbind(function (j) {
        return eff6(i, j);
    });
}