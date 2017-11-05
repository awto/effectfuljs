(function () {
    eff(0);
    lab: do { 
        eff(1);
        do {
            eff(2);
            if (eff(3)) {
                eff(4);
                break;
            }
            if (eff(3)) {
                eff(4);
                continue;
            }
            if (eff(5)) {
                eff(6);
                continue lab;
            }
            if (eff(7)) {
                eff(8);
                break lab;
            }
        } while(eff(9))
        eff(10);
    } while(true);
    eff(11);
});

