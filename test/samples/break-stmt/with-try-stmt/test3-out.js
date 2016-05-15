(function () {
    return M.block(function (lab) {
        return M.coerce(function () {
            return M(eff(2)).mbind(lab);
        }).mhandle(function (e) {
            return eff(3);
        });
    }).mbind(function () {
        return eff(4);
    });
});