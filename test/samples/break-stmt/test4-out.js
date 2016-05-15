(function () {
    return M(eff(1)).mbind(function () {
        return eff(3);
    }).mbind(function () {
        return eff(4);
    });
});