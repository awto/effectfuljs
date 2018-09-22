function a1() {
  eff(1) || eff(2);
}

function a2() {
    eff(1) && eff(2);
}

function a3() {
    eff(1) || eff(2) || eff(3);
}

function a4() {
    eff(1) && eff(2) && eff(3);
}

function a5() {
    1 || eff(2);
}

function a6() {
  eff(2) || 1;
}

function a7() {
    1 + 1 || eff(2);
}

function a8() {
    eff(2) || 1 + 1;
}

function a9() {
    1 && eff(2);
}

function a10() {
    eff(2) && 1;
}

function a11() {
    1 + 1 && eff(2);
}

function a12() {
    eff(2) && 1 + 1;
}
function a13() {
    eff(1) ? eff(2) : eff(3);
}
function a14() {
    eff(1) ? 2 : eff(3);
}
function a14_1() {
  return eff(1) ? 2 : eff(3);
}

function a15() {
    eff(1) ? eff(2) : 3;
}

function a16() {
    1 ? eff(2) : eff(3);
}

function a17() {
    console.log(eff(1) ? 2 : 3);
}

function a18() {
    eff(1) + eff(2) ? 2 : 3;
}

function a18_1() {
    return eff(1) + eff(2) ? 2 : 3;
}

function a19() {
  eff(eff(1) || (eff(2), eff(3)));
}
function a19_1() {
  return eff(eff(1) || (eff(2), eff(3)));
}

function b() {
    eff(1) || eff(2);
    eff(1) && eff(2);
    1 || eff(2);
    eff(2) || 1;
    1 + 1 || eff(2);
    eff(2) || 1 + 1;
    1 && eff(2);
    eff(2) && 1;
    1 + 1 && eff(2);
    eff(2) && 1 + 1;
    eff(1) ? eff(2) : eff(3);
    eff(1) ? 2 : eff(3);
    eff(1) ? eff(2) : 3;
    1 ? eff(2) : eff(3);
    return eff(1) ? 2 : 3;
}

function l1() {
  var a, b, c, d, e
  cond ? (a = 1) : something
  eff(a)
  cond ? something : (b = 1)
  eff(b)
  cond ? (c = 1) : (c = 2)
  eff(b)
  d = 3 && something
  eff(d)
  something && (e = 4)
  eff(e)
  
}

M.profile("generators")

function* a1() {
  var i;
  (yield "a1") ? (yield "a2") : (yield "a3");
  yield ((yield "b1") % 2 ? "b2" : "b3");
  yield ((yield "c1") % 2 ? (yield "c2") : "c3");
  yield ((yield "d1") % 2 ? "d2" : (yield "d3"));
  yield ((yield "e1") % 2 ? (yield "e2") : (yield "e3"))
  yield ("a1l" && "a1r")
  yield (yield ("a2l") && "a2r")
  yield ("a3l" && (yield "a3r"))
  yield ("a3l" && !(yield "a3r"))
  yield (yield ("a4l") && (yield "a4r"))
  yield ("o1l" || "o1r")
  yield ((yield "o2l") && "o2r")
  yield ("o3l" && (yield "o3r"))
  return ((yield "o4l") && (yield "o4r"))
}

