function a$default() {
    var a, b, c, d, e;
    return M(eff1(1)).mbind(function ($dm$b) {
        a = $dm$b;
        return M(eff2(2)).mapply(function ($dm$b) {
            b = $dm$b;
        });
    }).mbind(function () {
        return M(eff3(3, a)).mbind(function ($dm$b) {
            c = $dm$b;
            return M(eff4(4, a)).mapply(function ($dm$b) {
                d = $dm$b;
            });
        });
    }).mbind(function () {
        return M(eff5(5)).mapply(function ($dm$b) {
            e = $dm$b;
            console.log(a + c);
        });
    });
}
function a$par$all() {
    var a, b, c, d, e;
    return M.seq(M(eff1(1)).mapply(function ($dm$b) {
        a = $dm$b;
    }), M(eff2(2)).mapply(function ($dm$b) {
        b = $dm$b;
    }), M(eff3(3, a)).mapply(function ($dm$b) {
        c = $dm$b;
    }), M(eff4(4, a)).mapply(function ($dm$b) {
        d = $dm$b;
    }), M(eff5(5)).mapply(function ($dm$b) {
        e = $dm$b;
        console.log(a + c);
    }));
}
function a$par$r$lhs$usage() {
    var a, b, c, d, e;
    return M.seq(M(eff1(1)).mapply(function ($dm$b) {
        a = $dm$b;
    }), M(eff2(2)).mapply(function ($dm$b) {
        b = $dm$b;
    }), M(eff5(5)).mapply(function ($dm$b) {
        e = $dm$b;
    })).mbind(function () {
        return M.seq(M(eff3(3, a)).mapply(function ($dm$b) {
            c = $dm$b;
        }), M(eff4(4, a)).mapply(function ($dm$b) {
            d = $dm$b;
        }));
    }).mapply(function () {
        console.log(a + c);
    });
}
function a$par$r$usage() {
    var a, b, c, d, e;
    return M.seq(M(eff1(1)).mapply(function ($dm$b) {
        a = $dm$b;
    }), M(eff2(2)).mapply(function ($dm$b) {
        b = $dm$b;
    }), M(eff5(5)).mapply(function ($dm$b) {
        e = $dm$b;
    })).mbind(function () {
        return M(eff3(3, a)).mbind(function ($dm$b) {
            c = $dm$b;
            return M(eff4(4, a)).mapply(function ($dm$b) {
                d = $dm$b;
            });
        });
    }).mapply(function () {
        console.log(a + c);
    });
}
function a$par$lhs$usage() {
    var a, b, c, d, e;
    return M.seq(M(eff1(1)).mapply(function ($dm$b) {
        a = $dm$b;
    }), M(eff2(2)).mapply(function ($dm$b) {
        b = $dm$b;
    })).mbind(function () {
        return M.seq(M(eff3(3, a)).mapply(function ($dm$b) {
            c = $dm$b;
        }), M(eff4(4, a)).mapply(function ($dm$b) {
            d = $dm$b;
        }), M(eff5(5)).mapply(function ($dm$b) {
            e = $dm$b;
        }));
    }).mapply(function () {
        console.log(a + c);
    });
}
function a$par$usage() {
    var a, b, c, d, e;
    return M.seq(M(eff1(1)).mapply(function ($dm$b) {
        a = $dm$b;
    }), M(eff2(2)).mapply(function ($dm$b) {
        b = $dm$b;
    })).mbind(function () {
        return M(eff3(3, a)).mbind(function ($dm$b) {
            c = $dm$b;
            return M.seq(M(eff4(4, a)).mapply(function ($dm$b) {
                d = $dm$b;
            }), M(eff5(5)).mapply(function ($dm$b) {
                e = $dm$b;
            }));
        });
    }).mapply(function () {
        console.log(a + c);
    });
}
