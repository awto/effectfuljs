(function () {
    return M.block(function (lab) {
        return M(eff(2)).mbind(function (b) {
            if (b)
                return lab();
            else
                return eff(3);
        });
    });
});