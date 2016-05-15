(function () {
    return M.block(function (lab) {
        return M.coerce(function () {
            return M(eff(1)).mbind(function (b) {
                if (b)
                    return M(eff('before break')).mbind(lab);
            }).mbind(function () {
                return eff(2);
            });
        }).mhandle(function (e) {
            return eff(3);
        }).mbind(function () {
            return eff(4);
        });
    }).mbind(function () {
        return eff(5);
    });
});