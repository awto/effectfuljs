function a() {
  var i;
  eff1(eff2((i = 0)), i++);
  lab1: {
    eff3(i++);
    eff4(i++);
    lab2: {
      eff5(i++);
      if (eff6(i++)) {
        eff7(i++);
        break lab1;
      } else if (eff7(i)) {
        i++;
        break lab2;
      } else {
        return 10;
      }
      eff7(i++);
    }
    eff8(i++);
  }
  eff9(i++);
  eff10(i++);
}
