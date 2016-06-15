function a() {
    var i;
    var iter;
    return M(eff(2)).mbind(function (b) {
        var _iter;
        _iter = M.forInIterator(b);
        return M.forPar(function (iter) {
            return iter;
        }, function (iter) {
            i = iter.value;
            return eff(i);
        }, function (iter) {
            iter = iter();
            return iter;
        }, _iter);
    });
}
function b() {
    var i;
    var iter;
    return M(eff(2)).mbind(function (b) {
        var _iter;
        _iter = M.forInIterator(b);
        return M.forPar(function (iter) {
            return iter;
        }, function (iter) {
            i = iter.value;
            return M(eff(i)).mconst(i);
        }, function (iter) {
            iter = iter();
            return iter;
        }, _iter);
    });
}
function c() {
    var i = init();
    var iter;
    return M(eff(2)).mbind(function (b) {
        var _iter;
        _iter = M.forInIterator(b);
        return M.forPar(function (iter) {
            return iter;
        }, function (iter) {
            i = iter.value;
            return eff(i);
        }, function (iter) {
            iter = iter();
            return iter;
        }, _iter);
    });
}
function d() {
    var i;
    var iter;
    return M(eff(2)).mapply(function (b) {
        var _iter;
        _iter = M.forInIterator(b);
        while (_iter) {
            i = _iter.value;
            console.log(i);
        }
    });
}
function e() {
    var i;
    var iter;
    iter = M.forInIterator(obj);
    return M.forPar(function (iter) {
        return iter;
    }, function (iter) {
        i = iter.value;
        return eff(i);
    }, function (iter) {
        iter = iter();
        return iter;
    }, iter);
}
function f() {
    var i;
    var iter;
    for (i in obj) {
        console.log(i);
    }
}
function g() {
    var i;
    var iter;
    return M(eff('a')).mbind(function () {
        return M(eff(2)).mbind(function (b2) {
            var _iter1;
            _iter1 = M.forInIterator(b2);
            return M.block(function (brk) {
                return M.repeat(function (iter) {
                    return M.block(function (cont) {
                        if (iter) {
                            i = iter.value;
                            return M(eff(i)).mbind(function (b) {
                                if (b)
                                    return cont();
                            }).mbind(function () {
                                return M(effB(i)).mbind(function (b1) {
                                    if (b1)
                                        return brk();
                                });
                            }).mbind(function () {
                                return eff('c');
                            });
                        } else
                            return brk();
                    }).mapply(function () {
                        var _iter = iter;
                        _iter = _iter();
                        return _iter;
                    });
                }, iter);
            });
        });
    }).mbind(function () {
        return eff('z');
    });
}
function h() {
    var j;
    var iter;
    var i;
    var iter1;
    return M(eff('a')).mbind(function () {
        var _iter3, _j = j;
        _iter3 = M.forInIterator(obj);
        return M.block(function (labBrk) {
            return M.repeat(M.spread(function (iter, iter1, j) {
                return M.block(function (labCont) {
                    if (iter) {
                        j = iter.value;
                        console.log('j');
                        return M(effA(j)).mbind(function () {
                            return M(eff(j)).mbind(function (b4) {
                                var _iter1;
                                _iter1 = M.forInIterator(b4);
                                return M.block(function (brk) {
                                    return M.repeat(function (iter1) {
                                        return M.block(function (cont) {
                                            if (iter1) {
                                                i = iter1.value;
                                                console.log('b');
                                                return M(eff('b')).mbind(function () {
                                                    return M(eff(i + j)).mbind(function (b) {
                                                        if (b)
                                                            return labCont([
                                                                iter1,
                                                                j
                                                            ]);
                                                    });
                                                }).mbind(function () {
                                                    return M(effB(i + j)).mbind(function (b1) {
                                                        if (b1)
                                                            return labBrk();
                                                    });
                                                }).mbind(function () {
                                                    return M(eff(i)).mbind(function (b2) {
                                                        if (b2)
                                                            return cont();
                                                    });
                                                }).mbind(function () {
                                                    return M(effB(i)).mbind(function (b3) {
                                                        if (b3)
                                                            return brk(iter1);
                                                    });
                                                }).mbind(function () {
                                                    return eff('c');
                                                });
                                            } else
                                                return brk(iter1);
                                        }).mapply(function () {
                                            var _iter = iter1;
                                            _iter = _iter();
                                            return _iter;
                                        });
                                    }, iter1);
                                });
                            });
                        }).mbind(function (iter1) {
                            return M(effB(j)).mconst([
                                iter1,
                                j
                            ]);
                        });
                    } else
                        return labBrk();
                }).mapply(M.spread(function (iter1, j) {
                    var _iter2 = iter;
                    _iter2 = _iter2();
                    return [
                        _iter2,
                        iter1,
                        j
                    ];
                }));
            }), [
                iter,
                iter1,
                j
            ]);
        });
    }).mbind(function () {
        return eff('z');
    });
}