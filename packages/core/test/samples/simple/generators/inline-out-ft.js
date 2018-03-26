import * as M from "@effectful/core";

function a1() {
  var a1 = M.context();
  return M.scope(a1_1);
}

function a2() {
  var a2 = M.context();
  a2.$rc = a2_6;
  a2.$ec = a2_7;
  a2.$sc = a2_1;
  return a2.unwrap;
}

function a3() {
  var a3 = M.context();
  a3.null = a3_1;
  a3.$rc = 0;
  a3.$ec = 1;
  a3.$sc = 5;
  return 5(a3);
}

function a4() {
  var a4 = M.context();
  a4.null = a4_1;
  a4.$rc = 0;
  a4.$ec = 1;
  a4.$sc = 5;
  return a4;
}

function a1_1(a1) {
  return M.yld(1, a1_2);
}

function a1_2(a1, a) {
  if (a) {
    return M.yld(2, a1_3);
  } else {
    return M.yldStar(b, a1_5);
  }
}

function a1_3(a1, a) {
  return M.chain(a, a1_4);
}

function a1_4(a1, a) {
  return a;
}

function a1_5(a1) {
  return M.pure(a1._r);
}

function a2_1(a2) {
  a2.$sc = a2_2;
  a2.value = 1;
  return a2;
}

function a2_2(a2, a) {
  if (a) {
    a2.$sc = a2_3;
    a2.value = 2;
    return a2;
  } else {
    a2.$sc = a2_5;
    return M.$delegate(b);
  }
}

function a2_3(a2, a) {
  a2.$sc = a2_4;
  return Promise.resolve(a).then(a2.$resolve, a2.$reject);
}

function a2_4(a2, a) {
  a2.$sc = a2_6;
  a2.value = a;
  return a2;
}

function a2_5(a2) {
  return a2._r;
}

function a2_6(a2, r) {
  return r;
}

function a2_7(a2, e) {
  a2.$rc = a2_6;
  a2.$ec = a2_7;
  a2.$step = a2.$exit;
  throw e;
}

function a3_1(a3, p) {
  var s;

  switch (s = a3.$sc, s) {
    case 5:
      a3.$sc = 6;
      return {
        value: 1,
        done: false
      };

    case 6:
      if (p) {
        a3.$sc = 7;
        return {
          value: 2,
          done: false
        };
      } else {
        a3.$sc = 9;
        return M.$delegate(b);
      }

    case 7:
      a3.$sc = 8;
      return Promise.resolve(p).then(a3.$resolve, a3.$reject);

    case 8:
      a3.$sc = 0;
      return {
        value: p,
        done: false
      };

    case 9:
      a3.value = a3._r;
      a3.$step = 0, a3.done = true;
      return a3;

    case 0:
      a3.value = p;
      a3.$step = 0, a3.done = true;
      return a3;

    case 1:
      a3.$rc = 0;
      a3.$ec = 1;
      return a3.$step = 0, Promise.reject(p);

    case 2:
      return Promise.resolve(M.$redir(p)).then(a3.$resolve, a3.$reject);

    case 3:
      return M.$redirResult(p);

    default:
      throw new Error("invalid state");
  }
}

function a4_1(a4, p) {
  var s;

  switch (s = a4.$sc, s) {
    case 5:
      a4.$sc = 6;
      return Promise.resolve({
        value: 1,
        done: false
      });

    case 6:
      if (p) {
        a4.$sc = 7;
        return Promise.resolve({
          value: 2,
          done: false
        });
      } else {
        a4.$sc = 9;
        return M.$delegate(b);
      }

    case 7:
      a4.$sc = 8;
      return Promise.resolve(p).then(a4.$resolve, a4.$reject);

    case 8:
      a4.$sc = 0;
      return Promise.resolve({
        value: p,
        done: false
      });

    case 9:
      return Promise.resolve(a4._r);

    case 0:
      return Promise.resolve(p);

    case 1:
      a4.$rc = 0;
      a4.$ec = 1;
      return a4.$step = 0, Promise.reject(p);

    case 2:
      return Promise.resolve(M.$redir(p)).then(a4.$resolve, a4.$reject);

    case 3:
      return M.$redirResult(p);

    default:
      throw new Error("invalid state");
  }
}