// *- with state
function a() {
  var i = 0;
  eff();
  switch (eff((i += 1))) {
    case check((i += 2)):
      effB((i += 3));
      break;
    case check((i += 4)):
      effB((i += 5));
      break;
    case check((i += 6)):
      console.log("hi", i);
  }
  eff(i);
}
