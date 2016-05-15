(function () {
    return M(eff(1)).mbind(function () {
        return M.block(function (lab) {
            return M(eff(2)).mbind(function (b) {
                if (b)
                    return lab();
                else
                    return eff(3);
            });
        });
    }).mbind(function () {
        return eff(4);
    }).mbind(function () {
        return eff(5);
    });
});