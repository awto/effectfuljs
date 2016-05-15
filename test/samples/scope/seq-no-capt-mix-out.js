function ar() {
    var i, j;
    i += 1;
    return M(eff1(i)).mbind(function () {
        i += 2;
        return eff2(i);
    }).mbind(function () {
        i += 3;
        return M(effl1(i)).mbind(function () {
            return effl2(i);
        });
    });
}
function ar() {
    var i, j;
    i++;
    return M(effr1(i)).mbind(function () {
        return effr2(i);
    }).mbind(function () {
        i++;
        return effr3(i);
    }).mbind(function () {
        i++;
        return M(effl1(i)).mbind(function () {
            i++;
            return M(effl2(i)).mbind(function () {
                j = 2;
                i += 1;
                return M(effl3(i)).mbind(function () {
                    return M(effr4(3)).mbind(function () {
                        i++;
                        return effr5(j);
                    }).mbind(function () {
                        return effr6(3);
                    }).mbind(function () {
                        j = 1;
                        return effr7(i);
                    }).mbind(function () {
                        return effr8(i, j);
                    });
                });
            });
        });
    });
}
function a() {
    var i, j;
    i++;
    return M(effl1(i)).mbind(function () {
        return effl2(i);
    }).mbind(function () {
        i++;
        return M(effr1(i)).mbind(function () {
            return M(effr2(i)).mbind(function () {
                i++;
                return M(effr3(i)).mbind(function () {
                    j = 2;
                    i += 1;
                    return M(effr4(i)).mbind(function () {
                        return M(effr5(i)).mbind(function () {
                            return M(effr6(3)).mbind(function () {
                                i++;
                                return M(effl3(j)).mbind(function () {
                                    return effl4(3);
                                }).mbind(function () {
                                    j = 1;
                                    return effl5(i);
                                }).mbind(function () {
                                    return effl6(j);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}