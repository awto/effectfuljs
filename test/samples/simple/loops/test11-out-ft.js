function a() {
  var a_v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref1: undefined
  };
  a_v.ref1 = [1, 2, 3];

  for (a_v.j = 0, a_v.len = a_v.ref1.length; a_v.j < a_v.len; a_v.j++) {
    a_v.i = a_v.ref1[a_v.j];
    console.log(a_v.i);
  }

  return;
}