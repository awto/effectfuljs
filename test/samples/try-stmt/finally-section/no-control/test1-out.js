function a() {
  return M(eff('in body')).mfinally(() => eff('in `finally`')).mbind(() => eff('after `finally`'));
}

function b() {
  return M(eff('in body')).mhandle(e => eff('in `catch`', e)).mfinally(() => eff('in `finally`')).mbind(() => eff('after `finally`'));
}

function c() {
  return M(eff('in body')).mfinally(() => {
    console.log('in `finally`');
  }).mbind(() => eff('after `finally`'));
}

function d() {
  return M((() => {
    console.log('in body');
  })()).mfinally(() => eff('in `finally`')).mbind(() => eff('after `finally`'));
}

function e() {
  console.log('before');
  return M(eff('before')).mbind(() => M((() => {
    console.log('in body');
    return eff('in body');
  })()).mhandle(e => {
    console.log('catch', e);
    return M(eff('catch', e)).mapply(() => {
      console.log('catch', e);
    });
  }).mfinally(() => {
    console.log('in finally');
    return M(eff('in `finally`')).mapply(() => {
      console.log('in finally 2');
    });
  })).mbind(() => {
    console.log('after `finally`');
    return eff('after `finally`');
  });
}

function f() {
  return M(eff('in body')).mhandle(e => eff('in `catch`')).mfinally(() => {
    console.log('in `finally`');
  }).mbind(() => eff('after `finally`'));
}

function g() {
  return M(eff('in body')).mhandle(e => {
    console.log('in `catch`');
  }).mfinally(() => {
    console.log('in `finally`');
  }).mbind(() => eff('after `finally`'));
}