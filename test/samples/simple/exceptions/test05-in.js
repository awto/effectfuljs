function a() {
  try {
    eff(1);
  } catch(e) {
    console.log(e);
  } finally {
    console.log("fin");
  }
}
