function a() {
    var i;
    var iter;
    iter = M.iteratorBuf(some);
    return M.forPar(function (iter) {
        return iter;
    }, function (iter) {
        i = iter.value;
        return eff(1);
    }, function (iter) {
        iter = iter();
        return iter;
    }, iter).mbind(function () {
        return eff(2);
    });
}
function b() {
    var i;
    var iter;
    return M(eff('d')).mbind(function (b) {
        var _iter;
        _iter = M.iteratorBuf(b);
        return M.forPar(function (iter) {
            return iter;
        }, function (iter) {
            i = iter.value;
            return eff(i);
        }, function (iter) {
            iter = iter();
            return iter;
        }, _iter);
    }).mbind(function () {
        return eff(i);
    });
}
function c() {
    var i;
    var iter;
    var j;
    var iter1;
    iter = M.iteratorBuf(some);
    return M.forPar(function (iter) {
        return iter;
    }, function (iter) {
        i = iter.value;
        iter1 = M.iteratorBuf(other);
        return M.forPar(function (iter1) {
            return iter1;
        }, function (iter1) {
            j = iter1.value;
            return eff(i, j);
        }, function (iter1) {
            iter1 = iter1();
            return iter1;
        }, iter1);
    }, function (iter) {
        iter = iter();
        return iter;
    }, iter).mbind(function () {
        return eff(i, j);
    });
}
function d() {
    var i;
    var iter;
    iter = M.iterator(some);
    return M.forPar(function () {
        return iter;
    }, function () {
        i = iter.value;
        return eff(1);
    }, function () {
        iter = iter();
    }).mbind(function () {
        return eff(2);
    });
}
function p() {
    var i;
    var iter;
    for (var iter1 = M.iterator(some); iter1; iter1 = iter1()) {
        i = iter1.value;
        console.log(1);
    }
    console.log(2);
}