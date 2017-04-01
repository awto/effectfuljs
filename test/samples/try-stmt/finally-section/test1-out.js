function a() {
  return M.scope(ret => M(eff('in body')).mbind(a => {
    if (a) return ret();
  }).mfinally(() => eff('in `finally`')).mbind(() => eff('after `finally`')));
}