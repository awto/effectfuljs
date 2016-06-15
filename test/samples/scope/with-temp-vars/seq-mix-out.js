function ar() {
    var i, j;
    i += 1;
    return M(eff1(i)).mbind(function () {
        var _i = i;
        _i += 2;
        return M(eff2(_i)).mconst(_i);
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
        var _i = i;
        _i++;
        return M(effr3(_i)).mconst(_i);
    }).mbind(function (i) {
        i++;
        return M(effl1(i)).mbind(function () {
            var _i3 = i;
            _i3++;
            return M(effl2(_i3)).mbind(function () {
                var _i2 = i, _j1;
                _j1 = 2;
                _i2 += 1;
                return M(effl3(_i2)).mbind(function () {
                    return M(effr4(3)).mbind(function () {
                        var _i1 = i;
                        _i1++;
                        return M(effr5(j)).mconst(_i1);
                    }).mbind(function (i) {
                        return M(effr6(3)).mconst(i);
                    }).mbind(function (i) {
                        var _j = j;
                        _j = 1;
                        return M(effr7(i)).mconst([
                            i,
                            _j
                        ]);
                    }).mbind(M.spread(effr8));
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
        var _i3 = i;
        _i3++;
        return M(effr1(_i3)).mbind(function () {
            return M(effr2(i)).mbind(function () {
                var _i2 = i;
                _i2++;
                return M(effr3(_i2)).mbind(function () {
                    var _i1 = i, _j1;
                    _j1 = 2;
                    _i1 += 1;
                    return M(effr4(_i1)).mbind(function () {
                        return M(effr5(i)).mbind(function () {
                            return M(effr6(3)).mbind(function () {
                                var _i = i;
                                _i++;
                                return M(effl3(j)).mbind(function () {
                                    return effl4(3);
                                }).mbind(function () {
                                    var _j = j;
                                    _j = 1;
                                    return M(effl5(i)).mconst(_j);
                                }).mbind(effl6);
                            });
                        });
                    });
                });
            });
        });
    });
}