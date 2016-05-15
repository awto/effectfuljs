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
            return M.block(function (cont) {
                if (j < len) {
                    i = ref[j];
                    return M(eff(i)).mbind(function (b) {
                        if (b)
                            return cont(i);
                    }).mapply(function () {
                        return i;
                    });
                } else
                    return brk();
            }).mapply(function (i) {
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
    });
});
(function () {
    var i;
    console.log('bi');
    for (i = 0; i < 3; i++) {
        console.log('bi:', i);
    }
    console.log('ai');
});
(function () {
    var i;
    var j;
    console.log('bi');
    lab:
        for (i = 0; i < 3; i++) {
            console.log('bj:' + i);
            for (j = 0; j < 40; j += 10) {
                if (j === 10)
                    continue lab;
                if (j === 30)
                    break lab;
                console.log(i + j);
            }
            console.log('aj:' + i);
        }
    console.log('ai');
});
function a() {
    var i;
    return M(eff('b')).mbind(function () {
        i = 0;
        return M.forPar(function (i) {
            return i < 3;
        }, function (i) {
            if (i === 2)
                console.log(i);
            return eff(i);
        }, function (i) {
            i++;
            return i;
        }, i);
    }).mbind(function () {
        return eff('a');
    });
}
function a1() {
    var i, j;
    return M(eff('b')).mbind(function () {
        i = 0;
        j = 10;
        return M.forPar(M.spread(function (i, j) {
            return i < 3;
        }), M.spread(function (i, j) {
            if (i === 2)
                console.log(i, j);
            return eff(i, j);
        }), M.spread(function (i, j) {
            i++, j += 2;
            return [
                i,
                j
            ];
        }), [
            i,
            j
        ]);
    }).mbind(M.spread(effRes));
}
function b() {
    return M(eff('b')).mbind(function () {
        return M.forPar(function () {
            return true;
        }, function () {
            if (i === 2)
                console.log(i);
            return eff(i);
        }, function () {
        });
    }).mbind(function () {
        return eff('a');
    });
}
function c() {
    return M.scope(function (root) {
        return M(eff('b')).mbind(function () {
            return M.block(function (brk) {
                return M.repeat(function () {
                    if (true) {
                        if (i === 2)
                            console.log(i);
                        return M(function () {
                            if (i === 3)
                                return root(10);
                        }()).mbind(function () {
                            return eff(i);
                        });
                    } else
                        return brk();
                });
            });
        }).mbind(function () {
            return eff('a');
        });
    });
}