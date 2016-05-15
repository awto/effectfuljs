function a() {
  eff(1);
  eff(2);
  M.profile("minimal")
  eff(3);
  eff(4);
}

function b() {
  eff(1);
  eff(2);
  M.profile("minimal")
  eff(3);
  eff(4);
  M.profile("full")
  eff(5);
  eff(6);
  console.log("7");
}

function c() {
  eff(1);
  eff(2);
  {
    M.profile("minimal")
    eff(3);
    eff(4);
  }
  eff(5);
  eff(6);
  console.log("7");
}
