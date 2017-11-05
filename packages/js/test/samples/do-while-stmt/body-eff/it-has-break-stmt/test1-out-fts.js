(function () {
  return M.jump(f_1, f_8);
});

function f_1() {
  return M.chain(eff(1), f_2, f_8);
}

function f_2(a) {
  if (a) {
    return M.jump(f_1, f_8);
  } else {
    return M.chain(eff(2), f_3, f_8);
  }
}

function f_3(a) {
  if (a) {
    return M.jump(f_6, f_8);
  } else {
    return M.chain(eff(3), f_4, f_8);
  }
}

function f_4() {
  return M.chain(eff(4), f_5, f_8);
}

function f_5(a) {
  if (!a) {
    return M.jump(f_6, f_8);
  } else {
    return M.jump(f_1, f_8);
  }
}

function f_6() {
  return M.chain(eff(5), f_7, f_8);
}

function f_7() {
  return M.pure();
}

function f_8(e) {
  return M.raise(e);
}