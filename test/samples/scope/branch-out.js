function a1() {
    var i, j;
    if (true)
        return efft(i += 1);
    else
        return effe(j += 2);
}
function a2() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            if (true)
                return efft(i += 1);
            else
                return effe(j += 2);
        }(i, j);
    });
}
function a2a() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i) {
            if (true)
                return efft(i += 1);
            else
                return effe(j);
        }(i);
    });
}
function a2b() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            if (true)
                return efft(i += 1);
            else
                j += 2;
        }(i, j);
    });
}
function a3() {
    var i, j;
    return function () {
        if (true)
            return M(efft(i += 1)).mconst([
                i,
                j
            ]);
        else
            return M(effe(j += 2)).mconst([
                i,
                j
            ]);
    }().mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}
function a3a() {
    var i, j;
    return function () {
        if (true)
            return M(efft(i += 1)).mconst([
                i,
                j
            ]);
        else
            return M(effe(j += 2)).mconst([
                i,
                j
            ]);
    }().mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}
function a3b() {
    var i, j;
    return function () {
        if (true)
            return M(efft(i += 1)).mconst(i);
        else
            return M(eff(j)).mconst(i);
    }().mapply(function (i) {
        console.log(i, j);
    });
}
function a3c() {
    var i, j;
    return M(function () {
        if (true)
            return M(efft(i += 1)).mconst([
                i,
                j
            ]);
        else {
            j += 2;
            return [
                i,
                j
            ];
        }
    }()).mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}
function a4() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            if (true)
                return M(efft(i += 1)).mconst([
                    i,
                    j
                ]);
            else
                return M(effe(j += 2)).mconst([
                    i,
                    j
                ]);
        }(i, j);
    }).mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}
function a4a() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i) {
            if (true)
                return M(efft(i += 1)).mconst(i);
            else
                return M(effe(j)).mconst(i);
        }(i);
    }).mapply(function (i) {
        console.log(i, j);
    });
}
function a4b() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            if (true)
                return M(efft(i += 1)).mconst([
                    i,
                    j
                ]);
            else {
                j += 2;
                return [
                    i,
                    j
                ];
            }
        }(i, j);
    }).mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}
function a5() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            if (true)
                return M(efft(i += 1)).mconst([
                    i,
                    j
                ]);
            else
                return M(effe(j += 2)).mconst([
                    i,
                    j
                ]);
        }(i, j);
    }).mbind(M.spread(function (i, j) {
        console.log(i, j);
        return M(eff(i, j)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(eff));
}
function a6() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i) {
            return M(eff(i++)).mbind(function (b) {
                return function (i, j) {
                    if (b)
                        return M(efft(i += 1)).mconst([
                            i,
                            j
                        ]);
                    else
                        return M(effe(j += 2)).mconst([
                            i,
                            j
                        ]);
                }(i, j);
            });
        }(i);
    }).mbind(M.spread(function (i, j) {
        console.log(i, j);
        return M(eff(i, j)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(eff));
}
function a7() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i) {
            return M(eff(i++)).mbind(function (b) {
                return function (j) {
                    if (b)
                        return M(eff(j++)).mbind(function () {
                            return function (i) {
                                return M(efft(i += 1)).mconst([
                                    i,
                                    j
                                ]);
                            }(i);
                        });
                    else
                        return M(effe(j += 2)).mconst([
                            i,
                            j
                        ]);
                }(j);
            });
        }(i);
    }).mbind(M.spread(function (i, j) {
        console.log(i, j);
        return M(eff(i, j)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(eff));
}
function drawM() {
    var start;
    var end;
    var c;
    return M.scope(function (root) {
        return M(event('mousedown')).mbind(function (b) {
            start = b;
            console.log('s', start);
            if (!start)
                return root(def);
        }).mbind(function () {
            return M(event('mouseup')).mapply(function (b1) {
                end = b1;
            });
        }).mbind(function () {
            console.log('e', end);
            c = '.box';
            if (!end) {
                c = '.draw';
                return M(event('mousemove')).mapply(function (b2) {
                    return function (end) {
                        end = b2;
                        console.log('m', start, end);
                        return end;
                    }(end);
                });
            } else
                return end;
        }).mbind(function (end) {
            console.log('s:', start);
            console.log('e:', end);
            return root({
                s: start,
                e: end
            });
        });
    });
}