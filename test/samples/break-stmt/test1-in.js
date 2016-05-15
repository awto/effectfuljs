(function () {
    eff(1);
    lab: { 
        if (eff(2))
            break lab;
        else
            eff(3);
    }
    eff(4);
    eff(5);
});

