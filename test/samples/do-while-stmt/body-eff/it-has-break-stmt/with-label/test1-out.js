(function () {
    return M(eff(0)).mbind(function () {
        return M.block(function (labBrk) {
            return M.repeat(function () {
                return M.block(function (labCont) {
                    return M(eff(1)).mbind(function () {
                        return M.block(function (brk) {
                            return M.repeat(function () {
                                return M.block(function (cont) {
                                    return M(eff(2)).mbind(function () {
                                        return M(eff(3)).mbind(function (b) {
                                            if (b)
                                                return M(eff(4)).mbind(brk);
                                        });
                                    }).mbind(function () {
                                        return M(eff(3)).mbind(function (b1) {
                                            if (b1)
                                                return M(eff(4)).mbind(cont);
                                        });
                                    }).mbind(function () {
                                        return M(eff(5)).mbind(function (b2) {
                                            if (b2)
                                                return M(eff(6)).mbind(labCont);
                                        });
                                    }).mbind(function () {
                                        return M(eff(7)).mbind(function (b3) {
                                            if (b3)
                                                return M(eff(8)).mbind(labBrk);
                                        });
                                    }).mbind(function () {
                                        return M(eff(9)).mbind(function (b4) {
                                            if (!b4)
                                                return brk();
                                        });
                                    });
                                });
                            });
                        });
                    }).mbind(function () {
                        return eff(10);
                    }).mbind(function () {
                        if (!true)
                            return labBrk();
                    });
                });
            });
        });
    }).mbind(function () {
        return eff(11);
    });
});