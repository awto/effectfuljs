function a() {
  try {
    eff(1);
  } catch(e) {
    console.log(e,1);
    eff(2);
    console.log(e,2);
  }
}
