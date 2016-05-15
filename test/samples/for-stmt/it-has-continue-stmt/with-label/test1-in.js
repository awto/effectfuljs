(function () {
    var i, j, len, ref;
    ref = [1, 2, 3];
    lab: for (i = 0; i < 3; i++) { 
        eff(i);
        for (j = 0, len = ref.length; j < len; j++) {
            d = ref[j];
            if (eff(d))
                continue;
            if (t1) 
                continue lab;
        }
    }
});


(function () {
    var i, j, len, ref;
    ref = [1, 2, 3];
    lab: for (i = 0; i < 3; i++) { 
        eff(i);
        for (j = 0, len = ref.length; j < len; j++) {
            d = ref[j];
            if (eff(d))
                continue;
            if (eff(2)) 
                continue lab;
        }
    }
});

(function () {
    var i, j, len, ref;
    ref = [1, 2, 3];
    lab: for (i = 0; i < 3; i++) { 
        eff(i);
        for (j = 0, len = ref.length; j < len; j++) {
            d = ref[j];
            eff(d);
            j++;
            if (t2)
                continue lab;
        }
    }
    eff(j);
});

(function () {
    var i, j, len, ref;
    ref = [1, 2, 3];
    for (j = 0, len = ref.length; j < len; j++) {
        d = ref[j];
        eff(d);
        i++;
        if (t2)
            continue;
    }
});
