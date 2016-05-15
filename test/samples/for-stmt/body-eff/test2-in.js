(function () {
    var i, j, d, len, ref;
    ref = [1, 2, 3];
    for (i = 0, len = ref.lenght; i < len; i++) {
        for (j = 0, len = ref.length; j < len; j++) {
            d = ref[j];
            eff(i);
        }
        eff(2);
    }
    eff(3);
});

