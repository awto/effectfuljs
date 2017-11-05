(function () {
    var i, j, len, ref;
    ref = [1, 2, 3];
    lab: for (i = 0; i < 3; i++) { 
        eff(i);
        for (j = 0, len = ref.length; j < len; j++) {
            d = ref[j];
            if (eff(d))
                break;
            if (eff(2)) 
                break lab;
        }
    }
});

