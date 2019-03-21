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
