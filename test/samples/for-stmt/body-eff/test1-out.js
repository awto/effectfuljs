(function () {
    var i, j, len, ref;
    ref = [
        1,
        2,
        3
    ];
    j = 0, len = ref.length;
    return M.forPar(function (j) {
        return j < len;
    }, function (j) {
        i = ref[j];
        return eff(i);
    }, function (j) {
        j++;
        return j;
    }, j);
});