(function () {
  return M.jump(f_1, f_5);
});

function f_1() {
  return M.chain(eff(2), f_2, f_5);
}

function f_2(a) {
  if (a) {
    return M.jump(f_1, f_5);
  } else {
    return M.chain(eff(3), f_3, f_5);
  }
}

function f_3() {
  return M.chain(eff(1), f_4, f_5);
}

function f_4(a) {
  if (!a) {
    return M.pure();
  } else {
    return M.jump(f_1, f_5);
  }
}

function f_5(e) {
  return M.raise(e);
}