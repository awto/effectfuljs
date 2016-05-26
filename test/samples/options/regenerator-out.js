function a() {
    return M.pure();
}
function b() {
    return M.pure(1);
}
function c() {
    return M.raise(new Error('1'));
}
function d() {
    return M.reflect([1]);
}
function e() {
    return M.reflect([1]).mbind(function () {
        return M.reflect([2]);
    });
}
function f() {
    return eff(1);
}
function g() {
    return eff(1).mbind(function () {
        return eff(2);
    });
}
