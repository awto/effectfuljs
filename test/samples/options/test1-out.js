function a() {
    return M(eff(1)).mbind(function () {
        return eff(2);
    }).mapply(function () {
        eff(3);
        eff(4);
    });
}
function b() {
    return M(eff(1)).mbind(function () {
        return eff(2);
    }).mbind(function () {
        eff(3);
        eff(4);
        return eff(5);
    }).mbind(function () {
        return eff(6);
    }).mapply(function () {
        console.log('7');
    });
}
function c() {
    return M(eff(1)).mbind(function () {
        return eff(2);
    }).mbind(function () {
        eff(3);
        eff(4);
        return eff(5);
    }).mbind(function () {
        return eff(6);
    }).mapply(function () {
        console.log('7');
    });
}