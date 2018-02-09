function a() {
  M.profile("defaultFull");
  p1();
  p2();
  function a() {
    console.log('hi')
    e1()
    e2()
  }
  M.profile("defaultMinimal");
  p2();
  p3();
  function b() {
    p4();
    p5();
    M(e1());
    M(e(2));
  }
}
