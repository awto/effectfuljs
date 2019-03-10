function a() {
  {
    eff1();
    if (a1) {
      eff2();
    }
  }
  M.option({ coerce: false });
  {
    eff3();
    if (a2) {
      eff4();
    }
  }
  {
    M.option({ coerce: true });
    eff5();
    if (a3) {
      eff6();
    }
  }
  {
    eff7();
    if (a4) {
      eff8();
    }
  }
}
