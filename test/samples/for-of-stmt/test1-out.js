function a() {
    var i;
    var iter;
    iter = M.iteratorBuf(some);
    return M.block(function (brk) {
        return M.repeat(function (iter) {
            return M(function () {
                if (iter) {
                    i = iter.value;
                    return eff(1);
                } else
                    return brk();
            }()).mapply(function () {
                var _iter = iter;
                _iter = _iter();
                return _iter;
            });
        }, iter);
    }).mbind(function () {
        return eff(2);
    });
}
function b() {
    var i;
    var iter;
    return M(eff('d')).mbind(function (b) {
        var _iter1;
        _iter1 = M.iteratorBuf(b);
        return M.block(function (brk) {
            return M.repeat(function (iter) {
                return M(function () {
                    if (iter) {
                        i = iter.value;
                        return eff(i);
                    } else
                        return brk();
                }()).mapply(function () {
                    var _iter = iter;
                    _iter = _iter();
                    return _iter;
                });
            }, _iter1);
        });
    }).mbind(function () {
        return eff(i);
    });
}
function c() {
    var i;
    var iter;
    var j;
    var iter1;
    iter = M.iteratorBuf(some);
    return M.block(function (brk) {
        return M.repeat(function (a) {
            var iter = a[0], iter1 = a[1];
            return function () {
                if (iter) {
                    i = iter.value;
                    iter1 = M.iteratorBuf(other);
                    return M.block(function (brk1) {
                        return M.repeat(function (iter1) {
                            return M(function () {
                                if (iter1) {
                                    j = iter1.value;
                                    return eff(i, j);
                                } else
                                    return brk1(iter1);
                            }()).mapply(function () {
                                var _iter = iter1;
                                _iter = _iter();
                                return _iter;
                            });
                        }, iter1);
                    });
                } else
                    return brk();
            }().mapply(function (iter1) {
                var _iter1 = iter;
                _iter1 = _iter1();
                return [
                    _iter1,
                    iter1
                ];
            });
        }, [
            iter,
            iter1
        ]);
    }).mbind(function () {
        return eff(i, j);
    });
}
function d() {
    var i;
    var iter;
    iter = M.iterator(some);
    return M.block(function (brk) {
        return M.repeat(function () {
            return M(function () {
                if (iter) {
                    i = iter.value;
                    return eff(1);
                } else
                    return brk();
            }()).mapply(function () {
                iter = iter();
            });
        });
    }).mbind(function () {
        return eff(2);
    });
}
function p() {
    var i;
    var iter;
    for (var iter1 = M.iterator(some); iter1; iter1 = iter1()) {
        i = iter1.value;
        console.log(1);
    }
    console.log(2);
}