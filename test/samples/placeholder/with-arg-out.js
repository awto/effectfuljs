function a() {
    var k;
    var n = M.reify(function () {
        return M(eff(1)).mapply(function (b) {
            k = b;
        });
    });
    return n.mapply(function () {
        return k;
    }).eff(2);
}
function b() {
    var k;
    var n = M.reify(function () {
        return M(eff(1)).mbind(function (b) {
            k = b;
            return eff(2);
        });
    });
    return M.arr([
        n.mapply(function () {
            return k;
        }).eff(3),
        n.mapply(function () {
            return 1;
        }).eff(4)
    ]).mbind(function (a) {
        var b2 = a[0], b1 = a[1];
        console.log(b2 + b1);
        return eff(5);
    });
}