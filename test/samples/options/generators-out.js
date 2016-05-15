function a() {
    return M(eff(1)).mbind(function () {
        return eff(2);
    });
}
function b() {
    eff(1);
    eff(2);
}
function v() {
    return M(z).mapply(function (b) {
        console.log(b);
    });
}
function c() {
    return z;
}
function d() {
    return M(z).mbind(function () {
        return x;
    });
}
function e() {
    eff(1);
    eff(2);
    return M(eff(3)).mbind(function (b) {
        console.log(b + eff(3));
        return eff(eff(4));
    });
}