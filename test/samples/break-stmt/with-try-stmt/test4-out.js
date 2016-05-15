(function () {
    return M.block(function (lab) {
        return M.coerce(function () {
            return M(eff(2)).mbind(function () {
                return M(eff(3)).mbind(function (b) {
                    if (b)
                        return lab();
                    else
                        return M.raise(new Error('error'));
                });
            }).mbind(function () {
                return eff(4);
            });
        }).mhandle(function (e) {
            return eff(5);
        }).mbind(function () {
            return eff(6);
        });
    }).mbind(function () {
        return eff(7);
    });
});