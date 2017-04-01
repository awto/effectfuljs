function a() {
  var i, j, k, l;
  return M(M.ref(i, j)).mbind(() => eff(i, j, k, l)).mbind(() => {
    let i, j, k, l;
    const a = i++;
    const b = j++;
    const c = k++;
    const d = l++;
    return M(eff(a, b, c, d)).mbind(() => eff(i, j, k, l)).mbind(() => {
      let _i = i,
          _j = j,
          _k = k,
          _l = l;
      const a = _i++;
      const b = _j++;
      const c = _k++;
      const d = _l++;
      return M(eff(a, b, c, d)).mbind(() => eff(_i, _j, _k, _l));
    });
  });
}