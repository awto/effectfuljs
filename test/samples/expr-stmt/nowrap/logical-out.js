function a1() {
    return eff(1).mbind(function (s) {
        return s ? M.pure(s) : eff(2);
    });
}
function a2() {
    return eff(1).mbind(function (s) {
        return s ? eff(2) : M.pure(s);
    });
}
function a3() {
    return eff(1).mbind(function (s) {
        return s ? M.pure(s) : eff(2);
    }).mbind(function (s1) {
        return s1 ? M.pure(s1) : eff(3);
    });
}
function a4() {
    return eff(1).mbind(function (s) {
        return s ? eff(2) : M.pure(s);
    }).mbind(function (s1) {
        return s1 ? eff(3) : M.pure(s1);
    });
}
function a5() {
    return 1 ? M.pure(1) : eff(2);
}
function a6() {
    return eff(2).mapply(function (s) {
        s ? s : 1;
    });
}
function a7() {
    var s = 1 + 1;
    return s ? M.pure(s) : eff(2);
}
function a8() {
    return eff(2).mapply(function (s) {
        s ? s : 1 + 1;
    });
}
function a9() {
    return 1 ? eff(2) : M.pure(1);
}
function a10() {
    return eff(2).mapply(function (s) {
        s ? 1 : s;
    });
}
function a11() {
    var s = 1 + 1;
    return s ? eff(2) : M.pure(s);
}
function a12() {
    return eff(2).mapply(function (s) {
        s ? 1 + 1 : s;
    });
}
function a13() {
    return eff(1).mbind(function (b) {
        return b ? eff(2) : eff(3);
    });
}
function a14() {
    return eff(1).mbind(function (b) {
        return b ? M.pure(2) : eff(3);
    });
}
function a15() {
    return eff(1).mbind(function (b) {
        return b ? eff(2) : M.pure(3);
    });
}
function a16() {
    return 1 ? eff(2) : eff(3);
}
function a17() {
    return eff(1).mapply(function (b) {
        b ? 2 : 3;
    });
}
function b() {
    return eff(1).mbind(function (s) {
        return s ? M.pure(s) : eff(2);
    }).mbind(function () {
        return eff(1).mbind(function (s1) {
            return s1 ? eff(2) : M.pure(s1);
        });
    }).mbind(function () {
        return 1 ? M.pure(1) : eff(2);
    }).mbind(function () {
        return eff(2).mapply(function (s2) {
            s2 ? s2 : 1;
        });
    }).mbind(function () {
        var s3 = 1 + 1;
        return s3 ? M.pure(s3) : eff(2);
    }).mbind(function () {
        return eff(2).mapply(function (s4) {
            s4 ? s4 : 1 + 1;
        });
    }).mbind(function () {
        return 1 ? eff(2) : M.pure(1);
    }).mbind(function () {
        return eff(2).mapply(function (s5) {
            s5 ? 1 : s5;
        });
    }).mbind(function () {
        var s6 = 1 + 1;
        return s6 ? eff(2) : M.pure(s6);
    }).mbind(function () {
        return eff(2).mapply(function (s7) {
            s7 ? 1 + 1 : s7;
        });
    }).mbind(function () {
        return eff(1).mbind(function (b) {
            return b ? eff(2) : eff(3);
        });
    }).mbind(function () {
        return eff(1).mbind(function (b1) {
            return b1 ? M.pure(2) : eff(3);
        });
    }).mbind(function () {
        return eff(1).mbind(function (b2) {
            return b2 ? eff(2) : M.pure(3);
        });
    }).mbind(function () {
        return 1 ? eff(2) : eff(3);
    }).mbind(function () {
        return eff(1).mapply(function (b3) {
            b3 ? 2 : 3;
        });
    });
}