function a$def() {
    return M(eff(true)).mbind(function (b2) {
        if (b2) {
            console.log('1');
            return eff(1);
        } else
            return M.arr([
                eff(2),
                eff(3)
            ]).mapply(M.spread(function (b1, b) {
                console.log('2', b1, b);
            }));
    });
}
function a$def() {
    return M(eff(true)).mbind(function (b2) {
        if (b2) {
            console.log('1');
            return eff(1);
        } else
            return M.arr([
                eff(2),
                eff(3)
            ]).mapply(M.spread(function (b1, b) {
                console.log('2', b1, b);
            }));
    });
}