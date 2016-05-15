(function () {
    return M.block(function (lab) {
        return M.coerce(lab).mhandle(function (e) {
            return eff(3);
        });
    });
});