function a() {
  var i = 0, j = 0;
  eff(i++);
  for(i = 0; i < 10; ++i) {
      eff(i);
      j++;
      eff(j);
  }
  eff(i,j);
}

function a1() {
  var i = 0, j = 0;
  eff(i++);
  for(i = 0; i < 10; ++i) {
      eff(i);
      j++;
      eff(j);
  }
  eff(i);
}

function b() {
  var i = 0, j = 0;
  eff(i++);
  for(i = 0; i < 10; ++i) {
      eff(i);
      if (j++)
          break;
      eff(j);
  }
  eff(i,j);
}
