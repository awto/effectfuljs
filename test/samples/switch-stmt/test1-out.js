function a() {
    return M(eff()).mbind(function (s) {
        return M(effC(1)).mbind(function (b) {
            if (s === b)
                return effR(1);
        }).mbind(function () {
            return M(effC(2)).mbind(function (b1) {
                if (s === b1)
                    return effR(2);
            });
        }).mbind(function () {
            return effR('default');
        });
    });
}