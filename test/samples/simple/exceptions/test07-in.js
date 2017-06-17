function a() {
  try {
    eff(1);
  } finally {
    console.log(1);
    eff(2);
    console.log(2);
  }
}
