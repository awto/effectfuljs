function a1() {
    return M.arr([
        eff(1),
        eff(2)
    ]).mapply(M.spread(function (b1, b) {
        b1 || b;
    }));
}
function a2() {
    return M.arr([
        eff(1),
        eff(2)
    ]).mapply(M.spread(function (b1, b) {
        b1 && b;
    }));
}
function a3() {
    return M.arr([
        eff(1),
        eff(2),
        eff(3)
    ]).mapply(M.spread(function (b2, b1, b) {
        b2 || b1 || b;
    }));
}
function a4() {
    return M.arr([
        eff(1),
        eff(2),
        eff(3)
    ]).mapply(M.spread(function (b2, b1, b) {
        b2 && b1 && b;
    }));
}
function a5() {
    return M(eff(2)).mapply(function (b) {
        1 || b;
    });
}
function a6() {
    return M(eff(2)).mapply(function (b) {
        b || 1;
    });
}
function a7() {
    return M(eff(2)).mapply(function (b) {
        1 + 1 || b;
    });
}
function a8() {
    return M(eff(2)).mapply(function (b) {
        b || 1 + 1;
    });
}
function a9() {
    return M(eff(2)).mapply(function (b) {
        1 && b;
    });
}
function a10() {
    return M(eff(2)).mapply(function (b) {
        b && 1;
    });
}
function a11() {
    return M(eff(2)).mapply(function (b) {
        1 + 1 && b;
    });
}
function a12() {
    return M(eff(2)).mapply(function (b) {
        b && 1 + 1;
    });
}
function a13() {
    return M.arr([
        eff(1),
        eff(2),
        eff(3)
    ]).mapply(M.spread(function (b2, b1, b) {
        b2 ? b1 : b;
    }));
}
function a14() {
    return M.arr([
        eff(1),
        eff(3)
    ]).mapply(M.spread(function (b1, b) {
        b1 ? 2 : b;
    }));
}
function a15() {
    return M.arr([
        eff(1),
        eff(2)
    ]).mapply(M.spread(function (b1, b) {
        b1 ? b : 3;
    }));
}
function a16() {
    return M.arr([
        eff(2),
        eff(3)
    ]).mapply(M.spread(function (b1, b) {
        1 ? b1 : b;
    }));
}
function a17() {
    var k;
    return M(eff(1)).mapply(function (b) {
        k = b ? 2 : 3;
    });
}
function b() {
    var k;
    return M.arr([
        eff(1),
        eff(2)
    ]).mbind(M.spread(function (b1, b) {
        b1 || b;
        return M.arr([
            eff(1),
            eff(2)
        ]).mapply(M.spread(function (b3, b2) {
            b3 && b2;
        }));
    })).mbind(function () {
        return M(eff(2)).mapply(function (b4) {
            1 || b4;
        });
    }).mbind(function () {
        return M(eff(2)).mapply(function (b5) {
            b5 || 1;
        });
    }).mbind(function () {
        return M(eff(2)).mapply(function (b6) {
            1 + 1 || b6;
        });
    }).mbind(function () {
        return M(eff(2)).mapply(function (b7) {
            b7 || 1 + 1;
        });
    }).mbind(function () {
        return M(eff(2)).mapply(function (b8) {
            1 && b8;
        });
    }).mbind(function () {
        return M(eff(2)).mapply(function (b9) {
            b9 && 1;
        });
    }).mbind(function () {
        return M(eff(2)).mapply(function (b10) {
            1 + 1 && b10;
        });
    }).mbind(function () {
        return M(eff(2)).mapply(function (b11) {
            b11 && 1 + 1;
        });
    }).mbind(function () {
        return M.arr([
            eff(1),
            eff(2),
            eff(3)
        ]).mapply(M.spread(function (b14, b13, b12) {
            b14 ? b13 : b12;
        }));
    }).mbind(function () {
        return M.arr([
            eff(1),
            eff(3)
        ]).mapply(M.spread(function (b16, b15) {
            b16 ? 2 : b15;
        }));
    }).mbind(function () {
        return M.arr([
            eff(1),
            eff(2)
        ]).mapply(M.spread(function (b18, b17) {
            b18 ? b17 : 3;
        }));
    }).mbind(function () {
        return M.arr([
            eff(2),
            eff(3)
        ]).mapply(M.spread(function (b20, b19) {
            1 ? b20 : b19;
        }));
    }).mbind(function () {
        return M(eff(1)).mapply(function (b21) {
            k = b21 ? 2 : 3;
        });
    });
}