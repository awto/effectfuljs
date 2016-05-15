(function () {
    return M.block(function (brk) {
        return M.repeat(function () {
            return M.block(function (cont) {
                return M(eff(1)).mbind(function (b) {
                    if (b)
                        return cont();
                }).mbind(function () {
                    return M(eff(2)).mbind(function (b1) {
                        if (b1)
                            return brk();
                    });
                }).mbind(function () {
                    return eff(3);
                }).mbind(function () {
                    return M(eff(4)).mbind(function (b2) {
                        if (!b2)
                            return brk();
                    });
                });
            });
        });
    }).mbind(function () {
        return eff(5);
    });
});