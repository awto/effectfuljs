// *- when it is the last statement
(function () {
    lab: { 
        if (eff(2))
          break lab;
        else
          eff(3);
    }
});
