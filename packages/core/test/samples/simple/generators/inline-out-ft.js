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

function a5() {
  var a5 = M.context();
  a5.null = a5_1;
  a5.$rc = 0;
  a5.$ec = 1;
  a5.$sc = 4;
  return a5;
}

function a6() {
  var a6 = M.context();
  a6.null = a6_1;
  a6.$rc = 0;
  a6.$ec = 1;
  a6.$sc = 5;
  return a6;
}

function a7() {
  var a7 = M.context();
  a7.null = a7_1;
  a7.$rc = 0;
  a7.$ec = 1;
  a7.$sc = 4;
  return a7;
}

function a8() {
  var a8 = M.context();
  a8.null = a8_1;
  a8.$rc = 0;
  a8.$ec = 1;
  a8.$sc = 5;
  return a8;
}

function a9() {
  var a9 = M.context();
  a9.null = a9_1;
  a9.$rc = 0;
  a9.$ec = 1;
  a9.$sc = 5;
  return a9;
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
  a1._k = a;
  return M.chain(a1._k, a1_4);
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
  a2._k = a;
  a2.$sc = a2_4;
  return Promise.resolve(a2._k).then(a2.$resolve, a2.$reject);
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
      a3._k = p;
      a3.$sc = 8;
      return Promise.resolve(a3._k).then(a3.$resolve, a3.$reject);

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
      a4._k = p;
      a4.$sc = 8;
      return Promise.resolve(a4._k).then(a4.$resolve, a4.$reject);

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

function a5_1(a5, p) {
  var s;

  switch (s = a5.$sc, s) {
    case 4:
      a5._loop = M.iterator(b);
      a5.$sc = 5;
      return 5(a5);

    case 5:
      a5.$rc = 10;
      a5.$ec = 9;

      if (!(a5._loop = a5._loop.step()).done) {
        a5._i = a5._loop.value;
        a5.$sc = 5;
        return M.$delegate(M.yld(a5._i));
      } else {
        a5.$sc = 6;
        a5._fc = 7;
        return 6(a5);
      }

    case 6:
      a5.$rc = 0;
      a5.$ec = 1;

      if (a5._loop.exit) {
        a5._loop.exit();
      }

      a5.$sc = a5._fc;
      return a5._fc(a5);

    case 7:
      return Promise.resolve(a5._r);

    case 0:
      a5.$rc = 0;
      a5.$ec = 1;
      return Promise.resolve(p);

    case 1:
      a5.$rc = 0;
      a5.$ec = 1;
      return a5.$step = 0, Promise.reject(p);

    case 8:
      return a5.$step = 0, Promise.reject(a5._err1);

    case 9:
      a5.$sc = 6;
      a5._fc = 8, a5._err1 = p;
      return 6(a5);

    case 10:
      a5.$sc = 6;
      a5._fc = 7, a5._r = p;
      return 6(a5);

    case 2:
      return M.$redir(p);

    default:
      throw new Error("invalid state");
  }
}

function a6_1(a6, p) {
  var a, c, s;

  switch (s = a6.$sc, s) {
    case 5:
      a6._loop = M.iteratorM(b);
      a6.$sc = 6;
      return 6(a6);

    case 6:
      a6.$rc = 12;
      a6.$ec = 11;
      a6.$sc = 7;
      return Promise.resolve(a6._loop.step()).then(a6.$resolve, a6.$reject);

    case 7:
      c = a6._loop = p;
      a = c.done;

      if (!a) {
        var a, c;
        a6._i = a6._loop.value;
        a6.$sc = 6;
        return Promise.resolve({
          value: a6._i,
          done: false
        });
      } else {
        a6.$sc = 8;
        a6._fc = 9;
        return 8(a6);
      }

    case 8:
      a6.$rc = 0;
      a6.$ec = 1;

      if (a6._loop.exit) {
        a6.$sc = a6._fc;
        return Promise.resolve(a6._loop.exit()).then(a6.$resolve, a6.$reject);
      } else {
        a6.$sc = a6._fc;
        return a6._fc(a6);
      }

    case 9:
      return Promise.resolve(a6._r);

    case 0:
      a6.$rc = 0;
      a6.$ec = 1;
      return Promise.resolve(p);

    case 1:
      a6.$rc = 0;
      a6.$ec = 1;
      return a6.$step = 0, Promise.reject(p);

    case 10:
      return a6.$step = 0, Promise.reject(a6._err1);

    case 11:
      a6.$sc = 8;
      a6._fc = 10, a6._err1 = p;
      return 8(a6);

    case 12:
      a6.$sc = 8;
      a6._fc = 9, a6._r = p;
      return 8(a6);

    default:
      throw new Error("invalid state");
  }
}

function a7_1(a7, p) {
  var s;

  switch (s = a7.$sc, s) {
    case 4:
      a7._loop = M.iterator(b);
      a7.$sc = 5;
      return 5(a7);

    case 5:
      a7.$rc = 10;
      a7.$ec = 9;

      if (!(a7._i1 = a7._loop.next()).done) {
        a7._i = a7._i1.value;
        a7.$sc = 5;
        return M.$delegate(M.yld(a7._i));
      } else {
        a7.$sc = 6;
        a7._fc = 7;
        return 6(a7);
      }

    case 6:
      a7.$rc = 0;
      a7.$ec = 1;

      if (a7._loop.return) {
        a7._loop.return();
      }

      a7.$sc = a7._fc;
      return a7._fc(a7);

    case 7:
      return Promise.resolve(a7._r);

    case 0:
      a7.$rc = 0;
      a7.$ec = 1;
      return Promise.resolve(p);

    case 1:
      a7.$rc = 0;
      a7.$ec = 1;
      return a7.$step = 0, Promise.reject(p);

    case 8:
      return a7.$step = 0, Promise.reject(a7._err1);

    case 9:
      a7.$sc = 6;
      a7._fc = 8, a7._err1 = p;
      return 6(a7);

    case 10:
      a7.$sc = 6;
      a7._fc = 7, a7._r = p;
      return 6(a7);

    case 2:
      return M.$redir(p);

    default:
      throw new Error("invalid state");
  }
}

function a8_1(a8, p) {
  var a, c, s;

  switch (s = a8.$sc, s) {
    case 5:
      a8._loop = M.iteratorM(b);
      a8.$sc = 6;
      return 6(a8);

    case 6:
      a8.$rc = 12;
      a8.$ec = 11;
      a8.$sc = 7;
      return Promise.resolve(a8._loop.step()).then(a8.$resolve, a8.$reject);

    case 7:
      c = a8._loop = p;
      a = c.done;

      if (!a) {
        var a, c;
        a8._i = a8._loop.value;
        a8.$sc = 6;
        return Promise.resolve({
          value: a8._i,
          done: false
        });
      } else {
        a8.$sc = 8;
        a8._fc = 9;
        return 8(a8);
      }

    case 8:
      a8.$rc = 0;
      a8.$ec = 1;

      if (a8._loop.exit) {
        a8.$sc = a8._fc;
        return Promise.resolve(a8._loop.exit()).then(a8.$resolve, a8.$reject);
      } else {
        a8.$sc = a8._fc;
        return a8._fc(a8);
      }

    case 9:
      return Promise.resolve(a8._r);

    case 0:
      a8.$rc = 0;
      a8.$ec = 1;
      return Promise.resolve(p);

    case 1:
      a8.$rc = 0;
      a8.$ec = 1;
      return a8.$step = 0, Promise.reject(p);

    case 10:
      return a8.$step = 0, Promise.reject(a8._err1);

    case 11:
      a8.$sc = 8;
      a8._fc = 10, a8._err1 = p;
      return 8(a8);

    case 12:
      a8.$sc = 8;
      a8._fc = 9, a8._r = p;
      return 8(a8);

    default:
      throw new Error("invalid state");
  }
}

function a9_1(a9, p) {
  var a, c, s;

  switch (s = a9.$sc, s) {
    case 5:
      a9._loop = M.iteratorM(b);
      a9.$sc = 6;
      return 6(a9);

    case 6:
      a9.$rc = 12;
      a9.$ec = 11;
      a9.$sc = 7;
      return Promise.resolve(a9._loop.next()).then(a9.$resolve, a9.$reject);

    case 7:
      c = a9._i1 = p;
      a = c.done;

      if (!a) {
        var a, c;
        a9._i = a9._i1.value;
        a9.$sc = 6;
        return Promise.resolve({
          value: a9._i,
          done: false
        });
      } else {
        a9.$sc = 8;
        a9._fc = 9;
        return 8(a9);
      }

    case 8:
      a9.$rc = 0;
      a9.$ec = 1;

      if (a9._loop.return) {
        a9.$sc = a9._fc;
        return Promise.resolve(a9._loop.return()).then(a9.$resolve, a9.$reject);
      } else {
        a9.$sc = a9._fc;
        return a9._fc(a9);
      }

    case 9:
      return Promise.resolve(a9._r);

    case 0:
      a9.$rc = 0;
      a9.$ec = 1;
      return Promise.resolve(p);

    case 1:
      a9.$rc = 0;
      a9.$ec = 1;
      return a9.$step = 0, Promise.reject(p);

    case 10:
      return a9.$step = 0, Promise.reject(a9._err1);

    case 11:
      a9.$sc = 8;
      a9._fc = 10, a9._err1 = p;
      return 8(a9);

    case 12:
      a9.$sc = 8;
      a9._fc = 9, a9._r = p;
      return 8(a9);

    default:
      throw new Error("invalid state");
  }
}