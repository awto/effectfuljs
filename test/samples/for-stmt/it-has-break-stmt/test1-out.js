(function () {
    var i, j, len, ref;
    ref = [
        1,
        2,
        3
    ];
    j = 0, len = ref.length;
    return M.block(function (brk) {
        return M.repeat(M.spread(function (i, j) {
            return function () {
                if (j < len) {
                    i = ref[j];
                    return M(eff(i)).mbind(function (b) {
                        if (b)
                            return brk();
                    }).mapply(function () {
                        return i;
                    });
                } else
                    return brk();
            }().mapply(function (i) {
                return function (j) {
                    j++;
                    return [
                        i,
                        j
                    ];
                }(j);
            });
        }), [
            i,
            j
        ]);
    }).mbind(function () {
        return eff(2);
    }).mbind(function () {
        return eff(3);
    });
});