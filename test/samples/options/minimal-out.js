function a() {
    eff(1);
    eff(2);
    return eff(3);
}
function b() {
    eff(1);
    return M(eff(2)).mbind(function () {
        eff(3);
        return eff(4);
    }).mapply(function () {
        return 5;
    });
}