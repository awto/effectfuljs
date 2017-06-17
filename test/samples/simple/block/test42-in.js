function a() {
  eff1();
  eff2();
  lab1: {
    eff3();
    if (eff(4))
      break lab1;
    else
      return;
  }
  eff(5);
}
