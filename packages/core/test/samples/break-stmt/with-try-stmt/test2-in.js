// *- when it is the last statement
(function () {
    lab: {
      try {
        break lab;
      } catch (e) {
        eff(3); 
      }
    }
});
