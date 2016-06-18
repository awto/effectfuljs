(function () {
    var i, j, d, len, ref;
    ref = [
        1,
        2,
        3
    ];
    i = 0, len = ref.lenght;
    return M.block(function (brk) {
        return M.repeat(function (a) {
            var i = a[0], j = a[1], len = a[2];
            return function () {
                if (i < len) {
                    j = 0, len = ref.length;
                    return M.forPar(function (j) {
                        return j < len;
                    }, function (j) {
                        d = ref[j];
                        return eff(i);
                    }, function (j) {
                        j++;
                        return j;
                    }, j).mbind(function (j) {
                        return M(eff(2)).mconst([
                            j,
                            len
                        ]);
                    });
                } else
                    return brk();
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
    }).mbind(function () {
        return eff(3);
    });
});