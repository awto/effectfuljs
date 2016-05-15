function a() {
    return M(eff(1)).mbind(function () {
        (function () {
            var k;
            return M(eff(2)).mapply(function (b) {
                k = b;
                k + 1;
            });
        }());
        return eff(3);
    });
}
function b() {
    return M(eff(1)).mbind(function () {
        (function () {
            var k;
            return M(eff(2)).mapply(function (b) {
                k = b;
                k + 1;
            });
        }());
        return eff(3);
    });
}