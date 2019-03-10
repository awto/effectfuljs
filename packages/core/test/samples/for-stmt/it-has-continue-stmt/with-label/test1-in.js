function f1() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  lab: for (i = 0; i < 3; i++) {
    eff(i);
    for (j = 0, len = ref.length; j < len; j++) {
      d = ref[j];
      if (eff(d)) continue;
      if (t1) continue lab;
    }
  }
}

function f2() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  lab: for (i = 0; i < 3; i++) {
    eff(i);
    for (j = 0, len = ref.length; j < len; j++) {
      d = ref[j];
      if (eff(d)) continue;
      if (eff(2)) continue lab;
    }
  }
}
function f3() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  lab: for (i = 0; i < 3; i++) {
    eff(i);
    for (j = 0, len = ref.length; j < len; j++) {
      d = ref[j];
      eff(d);
      j++;
      if (t2) continue lab;
    }
  }
  eff(j);
}
function f4() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  for (j = 0, len = ref.length; j < len; j++) {
    d = ref[j];
    eff(d);
    i++;
    if (t2) continue;
  }
}

function f5() {
  var j, len;
  for (j = 0; true; j--) {
    eff(j);
    j++;
    if (t2) break;
  }
  eff(j);
}
