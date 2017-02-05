function a() {
  return M.scope(ret => M(eff('in body')).mbind(b => {
    if (b) return ret();
  }).mfinally(() => eff('in `finally`')).mbind(() => eff('after `finally`')));
}