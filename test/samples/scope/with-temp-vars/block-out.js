function a() {
    var i, j;
    return M.block(function (lab) {
        i++;
        return M(eff(i)).mbind(function () {
            var _i1 = i, _j = j;
            return M(eff(_i1 += 1, _j += 1)).mconst(_i1);
        }).mbind(function (i) {
            i += 3;
            return M(eff(i)).mbind(function () {
                var _i = i;
                return M(eff(_i += 4)).mconst(_i);
            }).mbind(function (i) {
                return M(function () {
                    if (false)
                        return lab(i);
                }()).mapply(function () {
                    return i;
                });
            });
        });
    }).mbind(eff);
}
function a1() {
    var i, j;
    return M(eff()).mbind(function () {
        var _i2 = i;
        return M.block(function (lab) {
            _i2++;
            return M(eff(_i2)).mbind(function () {
                var _i1 = _i2, _j = j;
                return M(eff(_i1 += 1, _j += 1)).mconst(_i1);
            }).mbind(function (i) {
                i += 3;
                return M(eff(i)).mbind(function () {
                    var _i = i;
                    return M(eff(_i += 4)).mconst(_i);
                }).mbind(function (i) {
                    return M(function () {
                        if (false)
                            return lab(i);
                    }()).mapply(function () {
                        return i;
                    });
                });
            });
        });
    }).mbind(eff);
}
function b() {
    var i, j;
    return M.block(function (lab) {
        i++;
        return M(eff(i)).mbind(function () {
            var _i1 = i, _j = j;
            return M(eff(_i1 += 1, _j += 1)).mconst(_i1);
        }).mbind(function (i) {
            i += 3;
            return M(eff(i)).mbind(function () {
                var _i = i;
                return M(eff(_i += 4)).mconst(_i);
            }).mbind(lab);
        });
    }).mbind(eff);
}
function c() {
    var i, j;
    return M.scope(function (root) {
        return M.block(function (lab) {
            i++;
            return M(eff(i)).mbind(function () {
                var _i1 = i, _j = j;
                return M(eff(_i1 += 1, _j += 1)).mconst(_i1);
            }).mbind(function (i) {
                i += 3;
                return M(eff(i)).mbind(function () {
                    var _i = i;
                    return M(eff(_i += 6)).mconst(_i);
                });
            }).mbind(function (i) {
                return root(i += 5);
            });
        }).mbind(function (i) {
            return M(eff(i)).mconst(i);
        }).mbind(function (i) {
            return eff(i += 7);
        });
    });
}
function c0() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i, _j = j;
        return M(eff(_i += 1, _j += 1)).mconst(_i);
    }).mbind(function (i) {
        return M(eff(i)).mconst(i);
    }).mbind(eff);
}
function c1() {
    var i, j;
    return M.scope(function (root) {
        return M.block(function (lab) {
            i++;
            return M(eff(i)).mbind(function () {
                var _i1 = i, _j = j;
                return M(eff(_i1 += 1, _j += 1)).mconst(_i1);
            }).mbind(function (i) {
                return M.block(function (lab2) {
                    i += 3;
                    return M(eff(i)).mbind(function () {
                        var _i = i;
                        return M(eff(_i += 6)).mconst(_i);
                    }).mbind(function (i) {
                        return M(function () {
                            if (true)
                                return lab2(i);
                        }()).mapply(function () {
                            return i;
                        });
                    }).mbind(function (i) {
                        return M(eff(i)).mconst(i);
                    }).mbind(function (i) {
                        return M(eff(i++)).mconst(i);
                    }).mbind(function (i) {
                        return M(function () {
                            if (true)
                                return lab(i);
                        }()).mapply(function () {
                            return i;
                        });
                    }).mbind(function (i) {
                        return M(eff(i)).mconst(i);
                    }).mbind(function (i) {
                        return M(eff(i++)).mconst(i);
                    });
                });
            }).mbind(function (i) {
                return root(i += 5);
            });
        }).mbind(function (i) {
            return M(eff(i)).mconst(i);
        }).mbind(function (i) {
            return eff(i += 7);
        });
    });
}
function c2() {
    var i, j;
    return M.scope(function (root) {
        return M(eff()).mbind(function () {
            var _i2 = i;
            return M.block(function (lab) {
                _i2++;
                return M(eff(_i2)).mbind(function () {
                    var _i1 = _i2, _j = j;
                    return M(eff(_i1 += 1, _j += 1)).mconst([
                        _i1,
                        _j
                    ]);
                }).mbind(function (a) {
                    var i = a[0], j = a[1];
                    return M.block(function (lab2) {
                        i += 3;
                        return M(eff(i)).mbind(function () {
                            var _i = i;
                            return M(eff(_i += 4)).mconst(_i);
                        }).mbind(function (i) {
                            return M(function () {
                                if (true)
                                    return lab2(i);
                            }()).mapply(function () {
                                return i;
                            });
                        }).mbind(function (i) {
                            return M(eff(i)).mconst(i);
                        }).mbind(function (i) {
                            return M(eff(i++)).mconst(i);
                        }).mbind(function (i) {
                            return M(function () {
                                if (true)
                                    return lab([
                                        i,
                                        j
                                    ]);
                            }()).mapply(function () {
                                return i;
                            });
                        }).mbind(function (i) {
                            return M(eff(i)).mconst(i);
                        }).mbind(function (i) {
                            return M(eff(i++)).mconst(i);
                        });
                    }).mapply(function (i) {
                        return [
                            i,
                            j
                        ];
                    });
                }).mbind(function (a) {
                    var i = a[0], j = a[1];
                    return root(i += 5);
                });
            });
        }).mbind(function (a) {
            var i = a[0], j = a[1];
            return M(eff(i, j)).mconst(i);
        }).mbind(function (i) {
            return eff(i += 7);
        });
    });
}
function d() {
    var i, j;
    return M.scope(function (root) {
        return M(eff(i++)).mbind(function () {
            if (t1)
                return root(i += 5);
        }).mapply(function () {
            console.log(i);
        });
    });
}