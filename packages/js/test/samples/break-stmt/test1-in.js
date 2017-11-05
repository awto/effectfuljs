(function () {
  eff(1);
  lab: { 
    if (eff(2))
      break lab;
    else
      eff(3);
  }
  eff(4);
  eff(5);
});
(function () {
  eff(1);
  lab: { 
    if (eff(2)) {
      eff('a');
      break lab;
    } else
      eff(3);
  }
  eff(4);
  eff(5);
});
(function () {
  eff(1);
  if (eff(2)) {
    eff('a');
    return eff('b');
  }
  eff(4);
  eff(5);
});
function a() {
  if (e) {
    return eff('b');
  }
}
