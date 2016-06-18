function a$def() {
    return M.arr([
        eff(1),
        eff(2)
    ]).mapply(function (a) {
        var b1 = a[0], b = a[1];
        b1 + b;
    });
}
function a$seq() {
    return M(eff(1)).mbind(function (b1) {
        return M(eff(2)).mapply(function (b) {
            b1 + b;
        });
    });
}