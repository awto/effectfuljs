let i;
eff_top();
function yh(a) {
  let j = (i += a);
  eff();
  return function eh() {
    eff((i += j));
  };
}

M.option({
  varStorageField: "$",
  closureStorageField: "$$"
});

function yh2(a) {
  let j = (i += a);
  eff();
  return function eh() {
    eff((i += j));
  };
}
