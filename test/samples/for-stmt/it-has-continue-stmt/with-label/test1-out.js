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
            return M.block(function (labCont) {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        var _j1, _len;
                        _j1 = 0, _len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return M.block(function (cont) {
                                    if (j < _len) {
                                        d = ref[j];
                                        return M(eff(d)).mbind(function (b) {
                                            if (b)
                                                return cont();
                                        }).mbind(function () {
                                            if (t1)
                                                return labCont([
                                                    j,
                                                    _len
                                                ]);
                                        });
                                    } else
                                        return brk(j);
                                }).mapply(function () {
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
            }).mapply(function (a) {
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
            return M.block(function (labCont) {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        var _j1, _len;
                        _j1 = 0, _len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return M.block(function (cont) {
                                    if (j < _len) {
                                        d = ref[j];
                                        return M(eff(d)).mbind(function (b) {
                                            if (b)
                                                return cont();
                                        }).mbind(function () {
                                            return M(eff(2)).mbind(function (b1) {
                                                if (b1)
                                                    return labCont([
                                                        j,
                                                        _len
                                                    ]);
                                            });
                                        });
                                    } else
                                        return brk(j);
                                }).mapply(function () {
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
            }).mapply(function (a) {
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
            return M.block(function (labCont) {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        var _j1, _len;
                        _j1 = 0, _len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return function () {
                                    if (j < _len) {
                                        d = ref[j];
                                        return M(eff(d)).mbind(function () {
                                            var _j = j;
                                            _j++;
                                            return M(function () {
                                                if (t2)
                                                    return labCont([
                                                        _j,
                                                        _len
                                                    ]);
                                            }()).mapply(function () {
                                                return _j;
                                            });
                                        });
                                    } else
                                        return brk(j);
                                }().mapply(function (j) {
                                    j++;
                                    return j;
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
                    return labBrk(j);
            }).mapply(function (a) {
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
    }).mbind(eff);
});
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
                    d = ref[j];
                    return M(eff(d)).mbind(function () {
                        var _i = i;
                        _i++;
                        return M(function () {
                            if (t2)
                                return cont(_i);
                        }()).mapply(function () {
                            return _i;
                        });
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