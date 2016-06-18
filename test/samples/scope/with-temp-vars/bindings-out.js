function a1() {
    var i;
    return eff1(i++);
}
function a2() {
    var i;
    return M(eff1(i++)).mbind(eff2);
}
function a3() {
    var i;
    return M(eff1(i++)).mbind(function () {
        return eff2(i);
    }).mbind(function () {
        var _i = i;
        return M(eff3(_i++)).mconst(_i);
    }).mbind(eff4);
}
function a4() {
    var i;
    return M(eff1(i++)).mbind(function (b) {
        var _i = i;
        return eff2(b, _i++);
    });
}
function a5() {
    var i;
    return M(eff1(i++)).mbind(function (b) {
        var _i = i;
        return M(eff2(b, _i++)).mconst(_i);
    }).mbind(eff);
}
function a6() {
    var i;
    var b1 = i++;
    return M(eff1(i += 2)).mbind(function (b) {
        return eff2(b1, b);
    });
}
function a7() {
    var i;
    var b1 = i++;
    return M(eff1(i += 2)).mbind(function (b) {
        return eff2(b1, b);
    }).mbind(function () {
        return eff(i);
    });
}
function a8() {
    var i;
    return M(eff1(i++)).mbind(function (b1) {
        var _i = i;
        return M(eff2(_i += 1)).mbind(function (b) {
            return eff3(b1, b);
        });
    });
}
function a9() {
    var i;
    return M(eff1(i++)).mbind(function (b1) {
        var _i = i;
        return M(eff1(_i += 1)).mbind(function (b) {
            return M(eff2(b1, b)).mconst(_i);
        });
    }).mbind(eff);
}
function a10() {
    var i;
    return M(eff1(i++)).mbind(function (b1) {
        var _i = i;
        return M(eff1(_i += 1)).mbind(function (b) {
            return eff2(b1, b);
        });
    });
}
function a11() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(2)).mbind(function (b) {
            return eff(b1 + b, i);
        });
    });
}
function a12() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(2)).mbind(function (b) {
            return eff(b1 + b);
        });
    }).mapply(function () {
        console.log(i);
    });
}
function a13() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(i)).mbind(function (b) {
            return eff1(b1, b);
        });
    });
}
function a14() {
    var i;
    return M(eff(i)).mbind(function (b1) {
        var _i = i;
        return M(eff(_i++)).mbind(function (b) {
            return eff1(b1, b);
        });
    });
}
function a15() {
    var i;
    return eff1(i, i++);
}
function a16() {
    var i;
    var b1 = i++;
    return M(eff(i)).mbind(function (b) {
        return eff(b1, b);
    });
}
function a17() {
    var i;
    var b1 = i++;
    return M(eff(i++)).mbind(function (b) {
        return eff(b1, b);
    });
}
function a18() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(i)).mbind(function (b) {
            return eff(b1, b);
        });
    });
}
function a19() {
    var i;
    return M(eff1(i += 1)).mbind(function () {
        var _i = i;
        return eff2(_i += 2);
    });
}
function a20() {
    var i;
    var b1 = i += 1;
    return M(eff(i++)).mbind(function (b) {
        return eff1(b1, b);
    }).mapply(function () {
        console.log(i);
    });
}
function a21() {
    var i;
    var b1 = i += 1;
    return M(eff(i++)).mbind(function (b) {
        return eff1(b1, b);
    }).mapply(function () {
        console.log(i);
    });
}
function a22() {
    var i;
    var b1 = i += 1;
    return M(eff(i++)).mbind(function (b) {
        return eff1(b1, b);
    }).mbind(function () {
        var _i = i;
        console.log(_i);
        var b3 = _i += 2;
        return M(eff(_i)).mbind(function (b2) {
            return eff2(b3, b2);
        });
    });
}
function a23() {
    var i;
    return eff1(i++, i += 1);
}
function a24() {
    var i;
    return M(eff1(i++, i += 1)).mbind(function () {
        var _i = i;
        return M(eff2(_i++, _i += 1)).mconst(_i);
    }).mbind(function (i) {
        return eff2(i++, i += 1);
    });
}
function a25() {
    var i;
    return M(eff1(i++, i += 1)).mapply(function () {
        console.log(i);
    });
}
function a26() {
    var i;
    return M(eff1(i++, i += 1)).mbind(function () {
        var _i = i;
        return M(eff2(_i++, _i += 1)).mconst(_i);
    }).mbind(function (i) {
        return M(eff2(i++, i += 1)).mconst(i);
    }).mapply(function (i) {
        console.log(i);
    });
}
function a27() {
    var i;
    return M(eff1(i++)).mbind(function () {
        var _i = i;
        return M(eff2(_i++)).mconst(_i);
    }).mbind(function (i) {
        return eff2(i++);
    });
}
function a28() {
    var i;
    return M(eff(i++)).mbind(eff).mbind(function () {
        return eff(i);
    });
}
function a29() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(2)).mbind(function (b) {
            return eff(b1 + b);
        });
    }).mapply(function () {
        var _i = i;
        _i++;
        console.log(_i);
    });
}
function a30() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(2)).mapply(function (b) {
            b1 + b;
        });
    }).mapply(function () {
        console.log(i);
    });
}
function a31() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(2)).mapply(function (b) {
            var _i = i;
            _i = b1 + b;
            return _i;
        });
    }).mapply(function (i) {
        console.log(i);
    });
}
function a32a() {
    var i;
    return M.arr([
        eff(i),
        eff(2)
    ]).mapply(function (a) {
        var b1 = a[0], b = a[1];
        console.log(b1 + b);
        console.log(i);
    });
}
function a32() {
    var i;
    return M(eff(i++)).mbind(function (b1) {
        return M(eff(2)).mapply(function (b) {
            console.log(b1 + b);
        });
    }).mapply(function () {
        console.log(i);
    });
}
function a33() {
    var i;
    i++;
    return M(eff(i)).mbind(function () {
        return eff(1);
    }).mbind(function () {
        var _i2 = i;
        return M(eff(_i2++)).mbind(function (b1) {
            var _i1 = _i2;
            return M(eff(_i1++)).mapply(function (b) {
                var _i = _i1;
                _i = b1 + b;
                return _i;
            });
        });
    }).mbind(function (i) {
        i++;
        return eff(i);
    }).mbind(function () {
        return eff(1);
    });
}
function a33a() {
    var i;
    return M(eff1(i)).mbind(function () {
        var _i1 = i;
        return M(eff2(_i1 += 1)).mbind(function (b1) {
            var _i = _i1;
            return M(eff3(_i += 2)).mapply(function (b) {
                console.log(b1 + b);
                return _i;
            });
        });
    }).mbind(eff4);
}
function a34() {
    var i;
    return M(eff1(i += 1)).mbind(function (b1) {
        var _i = i;
        return M(eff(_i += 2)).mapply(function (b) {
            console.log(b1, b);
        });
    });
}
function a35() {
    var i;
    return M(eff(i++)).mbind(function (b) {
        var _i = i;
        return b.eff(_i++);
    });
}
function a36() {
    var i;
    return M(eff(i++)).mbind(function (b) {
        var _i = i;
        return M(b.eff(_i++)).munshiftTo([_i]);
    }).mbind(function (a) {
        var b1 = a[0], i = a[1];
        return M(b1.eff(i++)).mconst(i);
    }).mbind(eff);
}
function a37() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i, _j = j;
        return M(eff(_i += 1, _j += 1)).mconst(_i);
    }).mbind(eff);
}
function a38() {
    var i, j;
    return M(eff(i)).mbind(function () {
        var _i = i;
        return M(eff(_i += 1)).mconst(_i);
    }).mbind(eff);
}
function a39() {
    var i, j;
    return M(eff(i++, j++)).mbind(function () {
        var _i = i, _j = j;
        return M(eff(_i++, _j++)).mconst([
            _i,
            _j
        ]);
    }).mapply(function (a) {
        var i = a[0], j = a[1];
        console.log(i, j);
    });
}
function aij() {
    var i, j, y;
    i++;
    return M(eff(i)).mbind(function (b) {
        return b.mbind(function () {
            return function (i) {
                j = 2;
                i++;
                return M(eff(j)).mbind(function (b) {
                    return b.mbind(function () {
                        return M(eff(i, j)).mbind(function (b) {
                            return b.mbind(function () {
                                return eff(j);
                            });
                        });
                    });
                });
            }(i);
        });
    });
}