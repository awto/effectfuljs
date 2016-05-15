(function () {
    var i, j, len, ref;
    ref = [
        1,
        2,
        3
    ];
    i = 0;
    return M.block(function (labBrk) {
        return M.repeat(M.spread(function (i, j, len) {
            return M.block(function (labCont) {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        j = 0, len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return M.block(function (cont) {
                                    if (j < len) {
                                        d = ref[j];
                                        return M(eff(d)).mbind(function (b) {
                                            if (b)
                                                return cont();
                                        }).mbind(function () {
                                            if (t1)
                                                return labCont([
                                                    j,
                                                    len
                                                ]);
                                        });
                                    } else
                                        return brk(j);
                                }).mapply(function () {
                                    return function (j) {
                                        j++;
                                        return j;
                                    }(j);
                                });
                            }, j);
                        });
                    }).mapply(function (j) {
                        return [
                            j,
                            len
                        ];
                    });
                else
                    return labBrk();
            }).mapply(M.spread(function (j, len) {
                return function (i) {
                    i++;
                    return [
                        i,
                        j,
                        len
                    ];
                }(i);
            }));
        }), [
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
        return M.repeat(M.spread(function (i, j, len) {
            return M.block(function (labCont) {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        j = 0, len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return M.block(function (cont) {
                                    if (j < len) {
                                        d = ref[j];
                                        return M(eff(d)).mbind(function (b) {
                                            if (b)
                                                return cont();
                                        }).mbind(function () {
                                            return M(eff(2)).mbind(function (b1) {
                                                if (b1)
                                                    return labCont([
                                                        j,
                                                        len
                                                    ]);
                                            });
                                        });
                                    } else
                                        return brk(j);
                                }).mapply(function () {
                                    return function (j) {
                                        j++;
                                        return j;
                                    }(j);
                                });
                            }, j);
                        });
                    }).mapply(function (j) {
                        return [
                            j,
                            len
                        ];
                    });
                else
                    return labBrk();
            }).mapply(M.spread(function (j, len) {
                return function (i) {
                    i++;
                    return [
                        i,
                        j,
                        len
                    ];
                }(i);
            }));
        }), [
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
        return M.repeat(M.spread(function (i, j, len) {
            return M.block(function (labCont) {
                if (i < 3)
                    return M(eff(i)).mbind(function () {
                        j = 0, len = ref.length;
                        return M.block(function (brk) {
                            return M.repeat(function (j) {
                                return function () {
                                    if (j < len) {
                                        d = ref[j];
                                        return M(eff(d)).mbind(function () {
                                            return function (j) {
                                                j++;
                                                return M(function () {
                                                    if (t2)
                                                        return labCont([
                                                            j,
                                                            len
                                                        ]);
                                                }()).mapply(function () {
                                                    return j;
                                                });
                                            }(j);
                                        });
                                    } else
                                        return brk(j);
                                }().mapply(function (j) {
                                    j++;
                                    return j;
                                });
                            }, j);
                        });
                    }).mapply(function (j) {
                        return [
                            j,
                            len
                        ];
                    });
                else
                    return labBrk(j);
            }).mapply(M.spread(function (j, len) {
                return function (i) {
                    i++;
                    return [
                        i,
                        j,
                        len
                    ];
                }(i);
            }));
        }), [
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
        return M.repeat(M.spread(function (i, j) {
            return M.block(function (cont) {
                if (j < len) {
                    d = ref[j];
                    return M(eff(d)).mbind(function () {
                        return function (i) {
                            i++;
                            return M(function () {
                                if (t2)
                                    return cont(i);
                            }()).mapply(function () {
                                return i;
                            });
                        }(i);
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