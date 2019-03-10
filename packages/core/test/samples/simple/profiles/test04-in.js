function a() {
  console.log("hi");
  e1();
  e2();
  M.profile("minimal");
  p1();
  console.profile("minimal");
  p2();
  console.profileEnd();
  M(e1());
  M(e(2));
}
