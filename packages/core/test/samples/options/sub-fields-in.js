M.option({ varStorageField: "V", closVarPrefix: "", closVarPostfix: "" });

function a1() {
  let i = 0;

  function b(j) {
    let k = j + i;
    i++;
    return eff_1();
  }
  return eff_2();
}

M.option({
  closureStorageField: "VV",
  closVarPrefix: "$",
  closVarPostfix: "$$"
});

function a2() {
  let i = 0;

  function b(j) {
    let k = j + i;
    i++;
    return eff_1();
  }
  return eff_2();
}

function oii() {
  let ii = 0;
  function oj() {
    let j = 0;
    function mapTest() {
      const v = [1, 2, 3];
      const self = {};
      return v.map(
        (i, x, t) => `${i}@${x}[${j++}/${ii++}]:${t === v}/${self === this}`,
        self
      );
    }
  }
}
