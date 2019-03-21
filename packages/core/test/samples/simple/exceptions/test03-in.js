function a() {
  var e, error;
  try {
    console.log("1");
    eff(1);
  } catch (error) {
    e = error;
    console.log("2");
  }
  eff(e);
}

function b() {
  var e, error;
  try {
    console.log("1");
    eff(1);
  } catch (error) {
    e = error;
    console.log("2");
    error = null;
  }
  eff(e);
}
