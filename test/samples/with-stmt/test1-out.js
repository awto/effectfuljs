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
        return function (i) {
            i++;
            return M(eff(f)).mbind(function (b) {
                return function (i) {
                    with (b) {
                        console.log(z, i);
                        z++;
                        i++;
                        return M(eff(z, i)).mbind(function () {
                            return eff(z, i);
                        }).mbind(function () {
                            return function (i) {
                                z++;
                                i++;
                                return M(eff(z, i)).mconst(i);
                            }(i);
                        }).mbind(function (i) {
                            return eff(z, i);
                        });
                    }
                }(i);
            });
        }(i);
    });
}