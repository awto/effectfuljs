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
        var _i = i, _j = j;
        if (true)
            return efft(_i += 1);
        else
            return effe(_j += 2);
    });
}
function a2a() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i;
        if (true)
            return efft(_i += 1);
        else
            return effe(j);
    });
}
function a2b() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i, _j = j;
        if (true)
            return efft(_i += 1);
        else
            _j += 2;
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
        var _i = i, _j = j;
        if (true)
            return M(efft(_i += 1)).mconst([
                _i,
                _j
            ]);
        else
            return M(effe(_j += 2)).mconst([
                _i,
                _j
            ]);
    }).mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}
function a4a() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i;
        if (true)
            return M(efft(_i += 1)).mconst(_i);
        else
            return M(effe(j)).mconst(_i);
    }).mapply(function (i) {
        console.log(i, j);
    });
}
function a4b() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i, _j = j;
        if (true)
            return M(efft(_i += 1)).mconst([
                _i,
                _j
            ]);
        else {
            _j += 2;
            return [
                _i,
                _j
            ];
        }
    }).mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}
function a5() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i, _j = j;
        if (true)
            return M(efft(_i += 1)).mconst([
                _i,
                _j
            ]);
        else
            return M(effe(_j += 2)).mconst([
                _i,
                _j
            ]);
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
        var _i1 = i;
        return M(eff(_i1++)).mbind(function (b) {
            var _i = i, _j = j;
            if (b)
                return M(efft(_i += 1)).mconst([
                    _i,
                    _j
                ]);
            else
                return M(effe(_j += 2)).mconst([
                    _i,
                    _j
                ]);
        });
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
        var _i1 = i;
        return M(eff(_i1++)).mbind(function (b) {
            var _j = j;
            if (b)
                return M(eff(_j++)).mbind(function () {
                    var _i = i;
                    return M(efft(_i += 1)).mconst([
                        _i,
                        j
                    ]);
                });
            else
                return M(effe(_j += 2)).mconst([
                    i,
                    _j
                ]);
        });
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
            var _start;
            _start = b;
            console.log('s', _start);
            return M(function () {
                if (!start)
                    return root(def);
            }()).mapply(function () {
                return start;
            });
        }).mbind(function (start) {
            return M(event('mouseup')).mapply(function (b1) {
                var _end;
                _end = b1;
                return [
                    _end,
                    start
                ];
            });
        }).mbind(M.spread(function (end, start) {
            var _c;
            console.log('e', end);
            _c = '.box';
            return M(function () {
                if (!end) {
                    c = '.draw';
                    return M(event('mousemove')).mapply(function (b2) {
                        var _end1 = end;
                        _end1 = b2;
                        console.log('m', start, _end1);
                        return _end1;
                    });
                } else
                    return end;
            }()).mapply(function (end) {
                return [
                    end,
                    start
                ];
            });
        })).mbind(M.spread(function (end, start) {
            console.log('s:', start);
            console.log('e:', end);
            return root({
                s: start,
                e: end
            });
        }));
    });
}