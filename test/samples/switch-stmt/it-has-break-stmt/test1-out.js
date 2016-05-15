function a(z) {
    return M.block(function (l) {
        return M(function () {
            if (z === 1)
                return M(eff(1)).mbind(l);
        }()).mbind(function () {
            return eff(2);
        });
    }).mbind(function () {
        return eff(3);
    });
}
function a(z) {
    return M.block(function (l) {
        return M(function () {
            if (z === 1)
                return M(eff(1)).mbind(l);
        }()).mbind(function () {
            if (z === 2) {
                console.log('1');
                return l();
            }
        }).mapply(function () {
            console.log('2');
        });
    }).mbind(function () {
        return eff(3);
    });
}
function c(z) {
    return M.block(function (lab) {
        return M.block(function (l) {
            return M(function () {
                if (z === 1)
                    return M(eff(1)).mbind(l);
            }()).mbind(function () {
                if (z === 2)
                    return M(eff(2)).mbind(lab);
            }).mbind(function () {
                if (z === 3)
                    console.log('z');
                return eff(3);
            });
        }).mbind(function () {
            return eff(4);
        });
    }).mbind(function () {
        return eff(5);
    });
}
function d(z) {
    return M.block(function (lab1) {
        return M.block(function (lab2) {
            return M.block(function (l) {
                return M(function () {
                    if (z === 1)
                        return M(eff(1)).mbind(l);
                }()).mbind(function () {
                    if (z === 2)
                        return M(eff(2)).mbind(lab1);
                }).mbind(function () {
                    if (z === 3) {
                        console.log('z');
                        return lab2();
                    }
                }).mbind(function () {
                    return eff(3);
                });
            }).mbind(function () {
                return eff(4);
            }).mbind(lab1);
        }).mbind(function () {
            return eff(5);
        });
    }).mbind(function () {
        return eff(6);
    });
}