let i;
function yh(a) {
  let j = (i += a);
  eff();
  return function eh() {
    i += j;
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
