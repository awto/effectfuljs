(function () {
    var i, j, len, ref;
    ref = [
        1,
        2,
        3
    ];
    i = 0;
    return M.block(function (labBrk) {
        return M.repeat(function (a) {
            var i = a[0], j = a[1], len = a[2];
            return function () {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        var _j1, _len;
                        _j1 = 0, _len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return function () {
                                    if (j < _len) {
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
                            }, _j1);
                        }).mapply(function (j) {
                            return [
                                j,
                                _len
                            ];
                        });
                    });
                else
                    return labBrk();
            }().mapply(function (a) {
                var j = a[0], len = a[1], _i = i;
                _i++;
                return [
                    _i,
                    j,
                    len
                ];
            });
        }, [
            i,
            j,
            len
        ]);
    });
});