function n1() {
    return eff(1).mbind(function () {
        return eff(2);
    });
}
function n2() {
    return eff(1).mbind(function () {
        return eff(2);
    }).mbind(function () {
        return eff(3);
    });
}
function n2() {
    return eff(1).mbind(eff(2), function (b1, b) {
        b1, b;
        return eff(3);
    });
}
function v1() {
    return M(eff(1)).mbind(function () {
        return eff(2);
    });
}
function v2() {
    return M(eff(1)).mbind(function () {
        return eff(2);
    }).mbind(function () {
        return eff(3);
    });
}
function v3() {
    return M(eff(1)).mbind(eff(2), function (b1, b) {
        b1, b;
        return eff(3);
    });
}
function t1() {
    return M(eff(1)).mbind(function () {
        return eff(1);
    });
}
function t2() {
    return M(eff(1)).mbind(function () {
        return eff(2);
    }).mbind(function () {
        return eff(3);
    });
}
function t3() {
    return M(eff(1)).mbind(eff(2), function (b1, b) {
        b1, b;
        return eff(3);
    });
}