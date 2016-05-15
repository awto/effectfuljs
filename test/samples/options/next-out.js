function a() {
    eff(1);
    return M(eff(2)).mbind(function () {
        return eff(3);
    });
}
function b() {
    eff1(1) + 2;
    return M(eff1(2)).mbind(function () {
        return eff1(3);
    });
}