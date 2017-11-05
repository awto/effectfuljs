function a() {
  let i = 0;
  eff1(i);
  lab: {
    eff2(i++);
    if (i) {
      i++;
      break lab;
    }
    eff3(i++);
  }
  eff4(i++);
}
