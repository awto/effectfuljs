function a2() {
  let i = 0;
  function c() {
    let m = 0;
    function b(j) {
      let k = j + i;
      i += m;
      return eff_1();
    }
    i++;
  }
  return eff_2();
}
