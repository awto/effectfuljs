function ai() {
    var i;
    i += 1;
    return M(eff1(i)).mbind(function () {
        var _i = i;
        _i += 2;
        return eff2(_i);
    });
}
function aij() {
    var i, j, y;
    i++;
    return M(eff(i)).mbind(function () {
        var _i = i, _j;
        _j = 2;
        _i++;
        return M(eff(_j)).mbind(function () {
            return M(eff(i, j)).mbind(function () {
                return eff(j);
            });
        });
    });
}
function aij1() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        var _i1 = i;
        _i1 += j;
        return M(eff(_i1)).mbind(function () {
            var _i = i, _j = j;
            _j = 2;
            _i++;
            return M(eff(_j)).mbind(function () {
                return M(eff(i, j)).mbind(function () {
                    return eff(j);
                });
            });
        });
    });
}
function aij2() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        var _i1 = i;
        _i1 += 2;
        return M(eff(_i1)).mbind(function () {
            var _i = i, _j;
            _j = 2;
            _i++;
            return M(eff(_j)).mbind(function () {
                return M(eff(i, j)).mbind(function () {
                    return eff(j);
                });
            });
        });
    });
}
function aij3() {
    var i, j, y;
    j = 0;
    i++;
    return M(eff(i)).mbind(function () {
        var _i = i, _j;
        _j = 2;
        _i++;
        return M(eff(_j)).mbind(function () {
            return M(eff(i, j)).mbind(function () {
                return eff(j);
            });
        });
    });
}
function ar() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return M(eff(i)).mbind(function () {
            var _i3 = i;
            _i3++;
            return M(eff(_i3)).mbind(function () {
                return M(eff(i)).mbind(function () {
                    var _i2 = i;
                    _i2++;
                    return M(eff(_i2)).mbind(function () {
                        var _i1 = i, _j1;
                        _j1 = 2;
                        _i1 += 1;
                        return M(eff(_i1)).mbind(function () {
                            return M(eff(3)).mbind(function () {
                                var _i = i;
                                _i++;
                                return M(eff(j)).mbind(function () {
                                    return M(eff(3)).mbind(function () {
                                        var _j = j;
                                        _j = 1;
                                        return M(eff(i)).mbind(function () {
                                            return eff(i, j);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function a() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return M(eff(i)).mbind(function () {
            var _i3 = i;
            _i3++;
            return M(eff(_i3)).mbind(function () {
                return M(eff(i)).mbind(function () {
                    var _i2 = i;
                    _i2++;
                    return M(eff(_i2)).mbind(function () {
                        var _i1 = i, _j1;
                        _j1 = 2;
                        _i1 += 1;
                        return M(eff(_i1)).mbind(function () {
                            return M(eff(i)).mbind(function () {
                                return M(eff(3)).mbind(function () {
                                    var _i = i;
                                    _i++;
                                    return M(eff(j)).mbind(function () {
                                        return M(eff(3)).mbind(function () {
                                            var _j = j;
                                            _j = 1;
                                            return M(eff(i)).mbind(function () {
                                                return eff(j);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function al() {
    var i, j;
    i += 2;
    return M(eff1(i)).mbind(function () {
        return M(eff1(i)).mbind(function () {
            var _i2 = i;
            _i2++;
            return M(eff2(_i2)).mbind(function () {
                return M(eff2(i)).mbind(function () {
                    var _i1 = i;
                    _i1 += 3;
                    return M(eff3(_i1)).mbind(function () {
                        return M(eff4(i)).mbind(function () {
                            var _i = i;
                            _i++;
                            return eff5(_i);
                        });
                    });
                });
            });
        });
    });
}
function b() {
    var i;
    i = new Something();
    return M(i.next()).mbind(function (b) {
        var _i2 = i;
        _i2 = b;
        return M(_i2.next()).mbind(function (b1) {
            var _i1 = i;
            _i1 = b1;
            return M(_i1.next()).mapply(function (b2) {
                var _i = i;
                _i = b2;
            });
        });
    });
}