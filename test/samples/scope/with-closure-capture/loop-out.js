function a() {
    var i, j;
    i = 0;
    j = 0;
    return M(eff(i++)).mbind(function () {
        return function (i) {
            i = 0;
            return M.block(function (brk) {
                return M.repeat(M.spread(function (i, j) {
                    return function () {
                        if (i < 10)
                            return M(eff(i)).mbind(function () {
                                return function (j) {
                                    j++;
                                    return M(eff(j)).mconst(j);
                                }(j);
                            });
                        else
                            return brk([
                                i,
                                j
                            ]);
                    }().mapply(function (j) {
                        return function (i) {
                            ++i;
                            return [
                                i,
                                j
                            ];
                        }(i);
                    });
                }), [
                    i,
                    j
                ]);
            });
        }(i);
    }).mbind(M.spread(eff));
}
function a1() {
    var i, j;
    i = 0;
    j = 0;
    return M(eff(i++)).mbind(function () {
        return function (i) {
            i = 0;
            return M.block(function (brk) {
                return M.repeat(M.spread(function (i, j) {
                    return function () {
                        if (i < 10)
                            return M(eff(i)).mbind(function () {
                                return function (j) {
                                    j++;
                                    return M(eff(j)).mconst(j);
                                }(j);
                            });
                        else
                            return brk(i);
                    }().mapply(function (j) {
                        return function (i) {
                            ++i;
                            return [
                                i,
                                j
                            ];
                        }(i);
                    });
                }), [
                    i,
                    j
                ]);
            });
        }(i);
    }).mbind(eff);
}
function b() {
    var i, j;
    i = 0;
    j = 0;
    return M(eff(i++)).mbind(function () {
        return function (i) {
            i = 0;
            return M.block(function (brk) {
                return M.repeat(M.spread(function (i, j) {
                    return function () {
                        if (i < 10)
                            return M(eff(i)).mbind(function () {
                                return function (j) {
                                    return M(function () {
                                        if (j++)
                                            return brk([
                                                i,
                                                j
                                            ]);
                                    }()).mapply(function () {
                                        return j;
                                    });
                                }(j);
                            }).mbind(function (j) {
                                return M(eff(j)).mconst(j);
                            });
                        else
                            return brk([
                                i,
                                j
                            ]);
                    }().mapply(function (j) {
                        return function (i) {
                            ++i;
                            return [
                                i,
                                j
                            ];
                        }(i);
                    });
                }), [
                    i,
                    j
                ]);
            });
        }(i);
    }).mbind(M.spread(eff));
}