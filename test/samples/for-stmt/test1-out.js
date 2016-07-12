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
        var _i;
        _i = 0;
        return M.forPar(function (i) {
            return i < 3;
        }, function (i) {
            if (i === 2)
                console.log(i);
            return eff(i);
        }, function (i) {
            i++;
            return i;
        }, _i);
    }).mbind(function () {
        return eff('a');
    });
}
function a1() {
    var i, j;
    return M(eff('b')).mbind(function () {
        var _i;
        _i = 0;
        j = 10;
        return M.forPar(function (a) {
            var i = a[0], j = a[1];
            return i < 3;
        }, function (a) {
            var i = a[0], j = a[1];
            if (i === 2)
                console.log(i, j);
            return eff(i, j);
        }, function (a) {
            var i = a[0], j = a[1];
            i++, j += 2;
            return [
                i,
                j
            ];
        }, [
            _i,
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
function d() {
    var result, i;
    result = 0;
    i = 0;
    return M.block(function (brk) {
        return M.repeat(function (a) {
            var i = a[0], result = a[1];
            return function () {
                if (i < 10)
                    return M(eff(result, i)).mapply(function (b) {
                        var _result = result;
                        _result = b;
                        return _result;
                    });
                else
                    return brk(result);
            }().mapply(function (result) {
                var _i = i;
                _i++;
                return [
                    _i,
                    result
                ];
            });
        }, [
            i,
            result
        ]);
    }).mbind(eff);
}
function e() {
    var result, i;
    result = 0;
    i = 0;
    return M.block(function (brk) {
        return M.repeat(function (i) {
            return function () {
                if (i < 10)
                    return M(eff(i)).mapply(function (b) {
                        var _result;
                        _result = b;
                    });
                else
                    return brk();
            }().mapply(function () {
                var _i = i;
                _i++;
                return _i;
            });
        }, i);
    }).mbind(eff);
}
function f() {
    var result, i;
    result = 0;
    i = 0;
    return M.block(function (brk) {
        return M.repeat(function (a) {
            var i = a[0], result = a[1];
            return function () {
                if (i < 10)
                    return M(eff(i)).mapply(function (b) {
                        var _result;
                        _result = b;
                        return _result;
                    });
                else
                    return brk(result);
            }().mapply(function (result) {
                var _i = i;
                _i++;
                return [
                    _i,
                    result
                ];
            });
        }, [
            i,
            result
        ]);
    }).mbind(eff);
}