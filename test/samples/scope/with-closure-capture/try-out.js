function a() {
    var i, j, k;
    return M(eff(k)).mbind(function () {
        return function (k) {
            k++;
            return M.coerce(function () {
                return M(eff(i)).mbind(function () {
                    return function (k) {
                        i++;
                        k++;
                        j = i;
                        return M(eff(i, j, k)).mconst(k);
                    }(k);
                }).mbind(function (k) {
                    return M(eff(i, j)).mconst(k);
                });
            }).mhandle(function (e) {
                console.log(i, j, e);
            }).mconst(k);
        }(k);
    }).mbind(function (k) {
        return M(eff(k += 1)).mconst(k);
    }).mapply(function (k) {
        console.log(k);
    });
}
function b() {
    var i, j, k;
    return M(eff(k)).mbind(function () {
        return function (k) {
            k++;
            return M.coerce(function () {
                return M(eff(i)).mbind(function () {
                    i++;
                    j = i;
                    return eff(i, j);
                });
            }).mhandle(function (e) {
                console.log(i, j, e);
            }).mconst(k);
        }(k);
    }).mbind(function (k) {
        return M(eff(k += 1)).mconst(k);
    }).mapply(function (k) {
        console.log(k);
    });
}