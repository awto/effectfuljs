(function () {
    var i, j, len, ref;
    ref = [
        1,
        2,
        3
    ];
    i = 0;
    return M.block(function (labBrk) {
        return M.repeat(M.spread(function (i, j, len) {
            return function () {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        var _j1, _len;
                        _j1 = 0, _len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return function () {
                                    if (j < len) {
                                        d = ref[j];
                                        return M(eff(d)).mbind(function (b) {
                                            if (b)
                                                return brk(j);
                                        }).mbind(function () {
                                            return M(eff(2)).mbind(function (b1) {
                                                if (b1)
                                                    return labBrk();
                                            });
                                        });
                                    } else
                                        return brk(j);
                                }().mapply(function () {
                                    var _j = j;
                                    _j++;
                                    return _j;
                                });
                            }, j);
                        }).mapply(function (j) {
                            return [
                                j,
                                len
                            ];
                        });
                    }).mbind(M.spread(function (j, len) {
                        return M(eff(3)).mconst([
                            j,
                            len
                        ]);
                    })).mbind(M.spread(function (j, len) {
                        return M(eff(4)).mconst([
                            j,
                            len
                        ]);
                    }));
                else
                    return labBrk();
            }().mapply(M.spread(function (j, len) {
                var _i = i;
                _i++;
                return [
                    _i,
                    j,
                    len
                ];
            }));
        }), [
            i,
            j,
            len
        ]);
    }).mbind(function () {
        return eff(5);
    }).mbind(function () {
        return eff(6);
    });
});