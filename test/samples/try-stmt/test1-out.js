function a() {
  console.log('in');
  return M((() => {
    console.log('inner');
    return eff('inner');
  })()).mhandle(e => {
    console.log('exception', e);
    return eff('exception', e);
  }).mbind(() => {
    console.log('out');
    return eff('out', e);
  });
}