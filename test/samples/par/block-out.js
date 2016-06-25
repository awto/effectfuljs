function a$default() {
    var a, b, c, d, e;
    return M(eff1(1)).mbind(function (b1) {
        var _a;
        _a = b1;
        return M(eff2(2)).mapply(function (b2) {
            var _b;
            _b = b2;
            return _a;
        });
    }).mbind(function (a) {
        return M(eff3(3, a)).mapply(function (b3) {
            var _c;
            _c = b3;
            return [
                a,
                _c
            ];
        });
    }).mbind(function (a1) {
        var a = a1[0], c = a1[1];
        return M(eff4(4, a)).mapply(function (b4) {
            var _d;
            _d = b4;
            return [
                a,
                c
            ];
        });
    }).mbind(function (a1) {
        var a = a1[0], c = a1[1];
        return M(eff5(5)).mapply(function (b5) {
            var _e;
            _e = b5;
            return [
                a,
                c
            ];
        });
    }).mapply(function (a1) {
        var a = a1[0], c = a1[1];
        console.log(a + c);
    });
}
function a$par$all() {
    var a, b, c, d, e;
    return M.par(M(eff1(1)).mapply(function (b1) {
        var _a;
        _a = b1;
        return _a;
    }), M(eff2(2)).mapply(function (b2) {
        var _b;
        _b = b2;
    }), M(eff3(3, a)).mapply(function (b3) {
        var _c;
        _c = b3;
        return _c;
    }), M(eff4(4, a)).mapply(function (b4) {
        var _d;
        _d = b4;
    }), M(eff5(5)).mapply(function (b5) {
        var _e;
        _e = b5;
        console.log(a + c);
    }));
}
function a$par$r$lhs$usage() {
    var a, b, c, d, e;
    return M.par(M(eff1(1)).mapply(function (b1) {
        var _a;
        _a = b1;
        return _a;
    }), M(eff2(2)).mapply(function (b2) {
        var _b;
        _b = b2;
    }), M(eff5(5)).mapply(function (b3) {
        var _e;
        _e = b3;
    })).mbind(function () {
        return M.par(M(eff3(3, a)).mapply(function (b4) {
            var _c;
            _c = b4;
            return _c;
        }), M(eff4(4, a)).mapply(function (b5) {
            var _d;
            _d = b5;
        }));
    }).mapply(function () {
        console.log(a + c);
    });
}
function a$par$r$usage() {
    var a, b, c, d, e;
    return M.par(M(eff1(1)).mapply(function (b1) {
        var _a;
        _a = b1;
        return _a;
    }), M(eff2(2)).mapply(function (b2) {
        var _b;
        _b = b2;
    }), M(eff5(5)).mapply(function (b3) {
        var _e;
        _e = b3;
    })).mbind(function () {
        return M(eff3(3, a)).mapply(function (b4) {
            var _c;
            _c = b4;
            return _c;
        });
    }).mbind(function (c) {
        return M(eff4(4, a)).mapply(function (b5) {
            var _d;
            _d = b5;
            return c;
        });
    }).mapply(function (c) {
        console.log(a + c);
    });
}
function a$par$lhs$usage() {
    var a, b, c, d, e;
    return M.par(M(eff1(1)).mapply(function (b1) {
        var _a;
        _a = b1;
        return _a;
    }), M(eff2(2)).mapply(function (b2) {
        var _b;
        _b = b2;
    })).mbind(function () {
        return M.par(M(eff3(3, a)).mapply(function (b3) {
            var _c;
            _c = b3;
            return _c;
        }), M(eff4(4, a)).mapply(function (b4) {
            var _d;
            _d = b4;
        }), M(eff5(5)).mapply(function (b5) {
            var _e;
            _e = b5;
        }));
    }).mapply(function () {
        console.log(a + c);
    });
}
function a$par$usage() {
    var a, b, c, d, e;
    return M.par(M(eff1(1)).mapply(function (b1) {
        var _a;
        _a = b1;
        return _a;
    }), M(eff2(2)).mapply(function (b2) {
        var _b;
        _b = b2;
    })).mbind(function () {
        return M(eff3(3, a)).mapply(function (b3) {
            var _c;
            _c = b3;
            return _c;
        });
    }).mbind(function (c) {
        return M.par(M(eff4(4, a)).mapply(function (b4) {
            var _d;
            _d = b4;
        }), M(eff5(5)).mapply(function (b5) {
            var _e;
            _e = b5;
        }));
    }).mapply(function () {
        console.log(a + c);
    });
}
