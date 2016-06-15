function a(f) {
    with (f) {
        console.log(z);
    }
}
function a(f) {
    with (f) {
        console.log(z);
        return M(eff(z)).mbind(function () {
            return eff(z);
        });
    }
}
function a(f) {
    return M(eff(z)).mbind(function () {
        with (f) {
            console.log(z);
            return M(eff(z)).mbind(function () {
                return eff(z);
            });
        }
    });
}
function a(f) {
    return M(eff(z)).mbind(function () {
        return M(eff(f)).mbind(function (b) {
            with (b) {
                console.log(z);
                return M(eff(z)).mbind(function () {
                    return eff(z);
                });
            }
        });
    });
}
function a(f) {
    return M(eff(z)).mbind(function () {
        return M(eff(f)).mbind(function (b) {
            with (b) {
                console.log(z);
                z++;
                return M(eff(z)).mbind(function () {
                    z++;
                    return eff(z);
                });
            }
        });
    });
}
function a(f) {
    var i;
    return M(eff(i, z)).mbind(function () {
        var _i2 = i;
        _i2++;
        return M(eff(f)).mbind(function (b) {
            var _i1 = i;
            with (b) {
                console.log(z, _i1);
                z++;
                _i1++;
                return M(eff(z, _i1)).mbind(function () {
                    return eff(z, i);
                }).mbind(function () {
                    var _i = i;
                    z++;
                    _i++;
                    return M(eff(z, _i)).mconst(_i);
                }).mbind(function (i) {
                    return eff(z, i);
                });
            }
        });
    });
}