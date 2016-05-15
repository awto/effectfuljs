function ar() {
    var i, j;
    i += 1;
    return M(eff1(i)).mbind(function () {
        return function (i) {
            i += 2;
            return M(eff2(i)).mconst(i);
        }(i);
    }).mbind(function (i) {
        i += 3;
        return M(effl1(i)).mbind(function () {
            return effl2(i);
        });
    });
}
function ar2() {
    var i, j;
    i++;
    return M(effr1(i)).mbind(function () {
        return effr2(i);
    }).mbind(function () {
        return function (i) {
            i++;
            return M(effr3(i)).mconst(i);
        }(i);
    }).mbind(function (i) {
        i++;
        return M(effl1(i)).mbind(function () {
            return function (i) {
                i++;
                return M(effl2(i)).mbind(function () {
                    return function (i) {
                        j = 2;
                        i += 1;
                        return M(effl3(i)).mbind(function () {
                            return M(effr4(3)).mbind(function () {
                                return function (i) {
                                    i++;
                                    return M(effr5(j)).mconst(i);
                                }(i);
                            }).mbind(function (i) {
                                return M(effr6(3)).mconst(i);
                            }).mbind(function (i) {
                                return function (j) {
                                    j = 1;
                                    return M(effr7(i)).mconst([
                                        i,
                                        j
                                    ]);
                                }(j);
                            }).mbind(M.spread(effr8));
                        });
                    }(i);
                });
            }(i);
        });
    });
}
function a() {
    var i, j;
    i++;
    return M(effl1(i)).mbind(function () {
        return effl2(i);
    }).mbind(function () {
        return function (i) {
            i++;
            return M(effr1(i)).mbind(function () {
                return M(effr2(i)).mbind(function () {
                    return function (i) {
                        i++;
                        return M(effr3(i)).mbind(function () {
                            return function (i) {
                                j = 2;
                                i += 1;
                                return M(effr4(i)).mbind(function () {
                                    return M(effr5(i)).mbind(function () {
                                        return M(effr6(3)).mbind(function () {
                                            return function (i) {
                                                i++;
                                                return M(effl3(j)).mbind(function () {
                                                    return effl4(3);
                                                }).mbind(function () {
                                                    return function (j) {
                                                        j = 1;
                                                        return M(effl5(i)).mconst(j);
                                                    }(j);
                                                }).mbind(effl6);
                                            }(i);
                                        });
                                    });
                                });
                            }(i);
                        });
                    }(i);
                });
            });
        }(i);
    });
}