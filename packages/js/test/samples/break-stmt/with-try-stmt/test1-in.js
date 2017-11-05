(function () {
    lab: {
        try {
            if (eff(1)) {
                eff("before break");
                break lab;
            }
            eff(2);
        } catch (e) {
            eff(3); 
        }
        eff(4);
    }
    eff(5);
});

