(function () {
    var i, j, len, ref;
    ref = [
        1,
        2,
        3
    ];
    j = 0, len = ref.length;
    return M.block(function (brk) {
        return M.repeat(function (a) {
            var i = a[0], j = a[1];
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
                var _j = j;
                _j++;
                return [
                    i,
                    _j
                ];
            });
        }, [
            i,
            j
        ]);
    });
});