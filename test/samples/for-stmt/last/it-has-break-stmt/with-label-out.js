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
                        j = 0, len = ref.length;
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
                                    return function (j) {
                                        j++;
                                        return j;
                                    }(j);
                                });
                            }, j);
                        });
                    }).mapply(function (j) {
                        return [
                            j,
                            len
                        ];
                    });
                else
                    return labBrk();
            }().mapply(M.spread(function (j, len) {
                return function (i) {
                    i++;
                    return [
                        i,
                        j,
                        len
                    ];
                }(i);
            }));
        }), [
            i,
            j,
            len
        ]);
    });
});