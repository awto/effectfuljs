(function () {
    lab: {
      try {
        eff(2); 
        if(eff(3))
          break lab;
        else 
          throw new Error("error");
        eff(4);
      } catch (e) {
        eff(5); 
      }
      eff(6);
    }
    eff(7);
});
