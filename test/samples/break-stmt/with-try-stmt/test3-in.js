(function () {
    lab: {
      try {
        eff(2); 
        break lab;
      } catch (e) {
        eff(3); 
      }
    }
    eff(4);
});
