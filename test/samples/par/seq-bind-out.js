function a$def() {
    return M.arr([
        eff(1),
        eff(2)
    ]).mapply(M.spread(function (b1, b) {
        b1 + b;
    }));
}
function a$seq() {
    return M(eff(1)).mbind(function (b1) {
        return M(eff(2)).mapply(function (b) {
            b1 + b;
        });
    });
}