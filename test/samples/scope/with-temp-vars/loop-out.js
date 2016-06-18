function a() {
    var i, j;
    i = 0;
    j = 0;
    return M(eff(i++)).mbind(function () {
        var _i1 = i;
        _i1 = 0;
        return M.block(function (brk) {
            return M.repeat(function (a) {
                var i = a[0], j = a[1];
                return function () {
                    if (i < 10)
                        return M(eff(i)).mbind(function () {
                            var _j = j;
                            _j++;
                            return M(eff(_j)).mconst(_j);
                        });
                    else
                        return brk([
                            i,
                            j
                        ]);
                }().mapply(function (j) {
                    var _i = i;
                    ++_i;
                    return [
                        _i,
                        j
                    ];
                });
            }, [
                _i1,
                j
            ]);
        });
    }).mbind(M.spread(eff));
}
function a1() {
    var i, j;
    i = 0;
    j = 0;
    return M(eff(i++)).mbind(function () {
        var _i1 = i;
        _i1 = 0;
        return M.block(function (brk) {
            return M.repeat(function (a) {
                var i = a[0], j = a[1];
                return function () {
                    if (i < 10)
                        return M(eff(i)).mbind(function () {
                            var _j = j;
                            _j++;
                            return M(eff(_j)).mconst(_j);
                        });
                    else
                        return brk(i);
                }().mapply(function (j) {
                    var _i = i;
                    ++_i;
                    return [
                        _i,
                        j
                    ];
                });
            }, [
                _i1,
                j
            ]);
        });
    }).mbind(eff);
}
function b() {
    var i, j;
    i = 0;
    j = 0;
    return M(eff(i++)).mbind(function () {
        var _i1 = i;
        _i1 = 0;
        return M.block(function (brk) {
            return M.repeat(function (a) {
                var i = a[0], j = a[1];
                return function () {
                    if (i < 10)
                        return M(eff(i)).mbind(function () {
                            var _j = j;
                            return M(function () {
                                if (_j++)
                                    return brk([
                                        i,
                                        _j
                                    ]);
                            }()).mapply(function () {
                                return _j;
                            });
                        }).mbind(function (j) {
                            return M(eff(j)).mconst(j);
                        });
                    else
                        return brk([
                            i,
                            _j
                        ]);
                }().mapply(function (j) {
                    var _i = i;
                    ++_i;
                    return [
                        _i,
                        j
                    ];
                });
            }, [
                _i1,
                j
            ]);
        });
    }).mbind(M.spread(eff));
}