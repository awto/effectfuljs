import * as M from '@effectful/core';

function a1() {
  var a1 = M.context();
  a1.$sc = _1;
  return M.scope(_5);

  function _1(a1) {
    a1._fc = _4, a1._loop = M.$delegate(b(), a1, a1, a1._fc);
    a1.$yld = _2;
    return M.jump(void 0, _7);
  }

  function _2(a1, i) {
    a1._loop.$s = a1.unwrap.$t;
    {
      a1._i = i;
      return M.yldStar(M.yld(a1._i), _7);
    }
  }

  function _3(a1) {
    return a1._loop.$exit();
  }

  function _4(a1) {
    a1.$r.$res = a1.$rstep, a1.$i.$yld = a1.$iyld;
    return M.$res();
  }

  function _5(a1, e) {
    a1.$i.$yld = a1.$iyld;
    return M.true(e);
  }

  function _6(a1) {
    a1.$i.$yld = a1.$iyld;
    return M.true(a1._err1);
  }

  function _7(a1, a) {
    a1.$sc = _3;
    a1._loop.$r = a1, a1._loop.$rstep = _6;
    a1._fe = _5, a1._err1 = a;
    return M.jump(void 0, _5);
  }
}

function a2() {
  var a2 = M.context();
  a2.$sc = _1;
  return M.scope(_6);

  function _1(a2) {
    a2._fc = _4, a2._loop = M.$delegate(b(), a2, a2, a2._fc);
    a2.$yld = _2;
    return M.jump(void 0, _8);
  }

  function _2(a2, i) {
    a2._loop.$s = a2.unwrap.$t;
    {
      a2._i = i;
      return M.yldStar(M.yld(a2._i), _8);
    }
  }

  function _3(a2) {
    return a2._loop.$exit();
  }

  function _4(a2) {
    return M.yldStar(M.yld('f'), _6);
  }

  function _5(a2) {
    a2.$r.$res = a2.$rstep, a2.$i.$yld = a2.$iyld;
    return M.$res();
  }

  function _6(a2, e) {
    a2.$i.$yld = a2.$iyld;
    return M.true(e);
  }

  function _7(a2) {
    a2.$i.$yld = a2.$iyld;
    return M.true(a2._err1);
  }

  function _8(a2, a) {
    a2.$sc = _3;
    a2._loop.$r = a2, a2._loop.$rstep = _7;
    a2._fe = _6, a2._err1 = a;
    return M.jump(void 0, _6);
  }
}

function a3() {
  var a3 = M.context();
  a3.$sc = _1;
  return M.scope(_9);

  function _1(a3) {
    a3._fc = _7, a3._loop = M.$delegate(b(), a3, a3, a3._fc);
    a3.$yld = _2;
    return M.jump(void 0, _11);
  }

  function _2(a3, i) {
    a3._loop.$s = a3.unwrap.$t;
    {
      a3._i = i;
      return M.yldStar(M.yld(a3._i), _11);
    }
  }

  function _3(a3) {
    var a;
    a = a3._i++;
    return M.yldStar(M.yld(a), _11);
  }

  function _4(a3, a) {
    var b;

    if (a) {
      a3.$yld = _2;
      return M.jumpR(void 0, _11);
    } else {
      b = a3._i += 2;
      return M.yldStar(M.yld(b), _11);
    }
  }

  function _5(a3, a) {
    if (a) {
      a3.$sc = _6;
      a3._loop.$r = a3, a3._loop.$rstep = _7;
      a3._fe = _9;
      return M.jump(void 0, _9);
    } else {
      a3.$yld = _2;
      return M.jumpR(void 0, _11);
    }
  }

  function _6(a3) {
    return a3._loop.$exit();
  }

  function _7(a3) {
    return M.yldStar(M.yld('f'), _9);
  }

  function _8(a3) {
    a3.$r.$res = a3.$rstep, a3.$i.$yld = a3.$iyld;
    return M.$res();
  }

  function _9(a3, e) {
    a3.$i.$yld = a3.$iyld;
    return M.true(e);
  }

  function _10(a3) {
    a3.$i.$yld = a3.$iyld;
    return M.true(a3._err1);
  }

  function _11(a3, a) {
    a3.$sc = _6;
    a3._loop.$r = a3, a3._loop.$rstep = _10;
    a3._fe = _9, a3._err1 = a;
    return M.jump(void 0, _9);
  }
}

function a4() {
  var a4 = M.context();
  a4.$sc = _1;
  return M.scope(_11);

  function _1(a4) {
    a4._fc = _7, a4._fc1 = _8, a4._loop = M.$delegate(b(), a4, a4, a4._fc);
    a4.$yld = _2;
    return M.jump(void 0, _12);
  }

  function _2(a4, i) {
    a4._loop.$s = a4.unwrap.$t;
    {
      a4._i = i;
      a4.$sc = _3;
      return M.jumpR(void 0, _13);
    }
  }

  function _3(a4, a) {
    return M.yldStar(M.yld(a4._i), _12);
  }

  function _4(a4) {
    var a;
    a4._e = a4._ex;
    a = a4._e.message;
    return M.yldStar(M.yld(a), _12);
  }

  function _5(a4, a) {
    return a4._loop.$exit();
  }

  function _6(a4, a) {
    a4._e1 = a4._ex1;
    a4._fc1 = _8, a4._fe1 = _9;
    return M.yldStar(M.yld(a4._e1), _9);
  }

  function _7(a4) {
    return M.yldStar(M.yld('f'), a4._fe1);
  }

  function _8(a4) {
    a4.$r.$res = a4.$rstep, a4.$i.$yld = a4.$iyld;
    return M.$res(r);
  }

  function _9(a4, e) {
    a4.$i.$yld = a4.$iyld;
    return M.true(e);
  }

  function _10(a4) {
    a4.$i.$yld = a4.$iyld;
    return M.true(a4._err1);
  }

  function _11(a4, a) {
    a4.$sc = _6;
    a4._ex1 = a;
    return M.jump(void 0, _14);
  }

  function _12(a4, a) {
    a4.$sc = _5;
    a4._loop.$r = a4, a4._loop.$rstep = _6;
    a4._fe = _14, a4._err2 = a;
    return M.jump(void 0, _11);
  }

  function _13(a4, a) {
    a4.$sc = _4;
    a4._ex = a;
    return M.jump(void 0, _12);
  }

  function _14(a4, a) {
    a4.$sc = _7;
    a4._fc1 = _10, a4._fe1 = _9, a4._err1 = a;
    return M.jump(void 0, _9);
  }
}

function a5(i) {
  var a5 = M.context();
  a5._i = i;
  a5.$sc = _1;
  return M.scope(_16);

  function _1(a5) {
    a5._fc2 = _15, a5._loop = M.$delegate(some, a5, a5, a5._fc2);
    a5.$yld = _2;
    return M.jump(void 0, _20);
  }

  function _2(a5, i) {
    a5._loop.$s = a5.unwrap.$t;
    {
      a5._i1 = i;
      a5._fc1 = _2, a5._loop1 = M.$delegate(a5._i1, a5, a5._loop.$s, a5._loop.$s.true, _2);
      a5.$yld = _3;
      return M.jumpR(void 0, _21);
    }
  }

  function _3(a5, i) {
    a5._loop1.$s = a5.unwrap.$t;
    {
      a5._j = i;
      a5.$sc = _4;
      return M.jumpR(void 0, _22);
    }
  }

  function _4(a5, a) {
    return M.yldStar(M.yld(a5._i1), _22);
  }

  function _5(a5, a) {
    switch (a) {
      case 1:
        a5.$sc = _12;
        a5._fx = a5._loop1, a5._fc = _3;
        a5._fe = _21;
        return M.jumpR(void 0, _21);

      case 2:
        a5.$sc = _12;
        a5._fx = a5, a5._fc = _13;
        a5._loop1.$r = a5._loop.$s, a5._loop1.$rstep = a5._loop.$s.$step;
        a5._fe = _20, a5._fe1 = _20;
        return M.jumpR(void 0, _21);

      case 3:
        a5.$sc = _12;
        a5._fx = a5, a5._fc = _13;
        a5._loop1.$r = a5._loop.$s, a5._loop1.$rstep = a5._loop.$s.$step;
        a5._fe = _20, a5._fe1 = _20;
        return M.jumpR(void 0, _21);

      case 4:
        a5.$sc = _12;
        a5._fx = a5, a5._fc = _13;
        a5._loop1.$r = a5, a5._loop1.$rstep = _14;
        a5._loop.$r = a5, a5._loop.$rstep = _15;
        a5._fe = _20, a5._fe1 = _16, a5._fe2 = _16;
        return M.jumpR(void 0, _21);

      case 5:
        a5.$sc = _12;
        a5._fx = a5, a5._fc = _13;
        a5._loop1.$r = a5, a5._loop1.$rstep = _14;
        a5._loop.$r = a5, a5._loop.$rstep = _15;
        a5._fe = _20, a5._fe1 = _16, a5._fe2 = _16, a5._r = 10;
        return M.jumpR(void 0, _21);

      case 6:
        a5.$sc = _12;
        a5._fx = a5._loop1, a5._fc = _3;
        a5._fe = _21;
        return M.jumpR(void 0, _21);

      case 7:
        return M.yldStar(M.yld(7), _22);

      case 8:
        return M.yldStar(M.yld(8), _22);

      case 9:
        return M.yldStar(M.yld(9), _22);

      case 10:
        return M.yldStar(M.yld(10), _22);

      case 11:
        return M.yldStar(M.yld(11), _22);

      case 12:
        return M.yldStar(M.yld(12), _22);

      default:
        a5.$sc = _12;
        a5._fx = a5._loop1, a5._fc = _3;
        a5._fe = _21;
        return M.jumpR(void 0, _21);
    }
  }

  function _6(a5, a) {
    a5.$sc = _12;
    a5._fx = a5._loop1, a5._fc = _3;
    a5._fe = _21;
    return M.jumpR(void 0, _21);
  }

  function _7(a5, a) {
    a5.$sc = _12;
    a5._fx = a5, a5._fc = _13;
    a5._loop1.$r = a5._loop.$s, a5._loop1.$rstep = a5._loop.$s.$step;
    a5._fe = _20, a5._fe1 = _20;
    return M.jumpR(void 0, _21);
  }

  function _8(a5, a) {
    a5.$sc = _12;
    a5._fx = a5, a5._fc = _13;
    a5._loop1.$r = a5._loop.$s, a5._loop1.$rstep = a5._loop.$s.$step;
    a5._fe = _20, a5._fe1 = _20;
    return M.jumpR(void 0, _21);
  }

  function _9(a5, a) {
    a5.$sc = _12;
    a5._fx = a5, a5._fc = _13;
    a5._loop1.$r = a5, a5._loop1.$rstep = _14;
    a5._loop.$r = a5, a5._loop.$rstep = _15;
    a5._fe = _20, a5._fe1 = _16, a5._fe2 = _16;
    return M.jumpR(void 0, _21);
  }

  function _10(a5, a) {
    a5.$sc = _12;
    a5._fx = a5, a5._fc = _13;
    a5._loop1.$r = a5, a5._loop1.$rstep = _14;
    a5._loop.$r = a5, a5._loop.$rstep = _15;
    a5._fe = _20, a5._fe1 = _16, a5._fe2 = _16, a5._r = 10;
    return M.jumpR(void 0, _21);
  }

  function _11(a5, a) {
    a5.$sc = _12;
    a5._fx = a5._loop1, a5._fc = _3;
    a5._fe = _21;
    return M.jumpR(void 0, _21);
  }

  function _12(a5, a) {
    console.log('F');
    a5.$sc = a5._fc;
    return a5._fx.true();
  }

  function _13(a5, a) {
    return a5._loop1.$exit();
  }

  function _14(a5, a) {
    return a5._loop.$exit();
  }

  function _15(a5) {
    a5.$r.$res = a5.$rstep, a5.$i.$yld = a5.$iyld;
    return M.$res(a5._r);
  }

  function _16(a5, e) {
    a5.$i.$yld = a5.$iyld;
    return M.true(e);
  }

  function _17(a5) {
    a5.$i.$yld = a5.$iyld;
    return M.true(a5._err1);
  }

  function _18(a5) {
    a5.$i.$yld = a5.$iyld;
    return M.true(a5._err2);
  }

  function _19(a5) {
    a5.$i.$yld = a5.$iyld;
    return M.true(a5._err3);
  }

  function _20(a5, a) {
    a5.$sc = _14;
    a5._loop.$r = a5, a5._loop.$rstep = _17;
    a5._fe2 = _16, a5._err1 = a;
    return M.jump(void 0, _16);
  }

  function _21(a5, a) {
    a5.$sc = _13;
    a5._loop1.$r = a5, a5._loop1.$rstep = _14;
    a5._loop.$r = a5, a5._loop.$rstep = _18;
    a5._fe1 = _16, a5._fe2 = _16, a5._err2 = a;
    return M.jump(void 0, _20);
  }

  function _22(a5, a) {
    a5.$sc = _12;
    a5._fx = a5, a5._fc = _13;
    a5._loop1.$r = a5, a5._loop1.$rstep = _14;
    a5._loop.$r = a5, a5._loop.$rstep = _19;
    a5._fe = _20, a5._fe1 = _16, a5._fe2 = _16, a5._err3 = a;
    return M.jump(void 0, _21);
  }
}

function a5_1(i) {
  var a5_1 = M.context();
  a5_1._i = i;
  a5_1.$sc = _1;
  return M.scope(_12);

  function _1(a5_1) {
    a5_1._fc1 = _11, a5_1._loop = M.$delegate(some, a5_1, a5_1, a5_1._fc1);
    a5_1.$yld = _2;
    return M.jump(void 0, _15);
  }

  function _2(a5_1, i) {
    a5_1._loop.$s = a5_1.unwrap.$t;
    {
      a5_1._i1 = i;
      a5_1._fc = _2, a5_1._loop1 = M.$delegate(a5_1._i1, a5_1, a5_1._loop.$s, a5_1._loop.$s.true, _2);
      a5_1.$yld = _3;
      return M.jumpR(void 0, _16);
    }
  }

  function _3(a5_1, i) {
    a5_1._loop1.$s = a5_1.unwrap.$t;
    {
      a5_1._j = i;
      return M.yldStar(M.yld(a5_1._i1), _16);
    }
  }

  function _4(a5_1, a) {
    switch (a) {
      case 1:
        a5_1.$yld = _3;
        return M.jumpR(void 0, _16);

      case 2:
        a5_1.$sc = _9;
        a5_1._loop1.$r = a5_1._loop.$s, a5_1._loop1.$rstep = a5_1._loop.$s.$step;
        a5_1._fe = _15;
        return M.jump(void 0, _15);

      case 3:
        a5_1.$sc = _9;
        a5_1._loop1.$r = a5_1._loop.$s, a5_1._loop1.$rstep = a5_1._loop.$s.$step;
        a5_1._fe = _15;
        return M.jump(void 0, _15);

      case 4:
        a5_1.$sc = _9;
        a5_1._loop1.$r = a5_1, a5_1._loop1.$rstep = _10;
        a5_1._loop.$r = a5_1, a5_1._loop.$rstep = _11;
        a5_1._fe = _12, a5_1._fe1 = _12;
        return M.jump(void 0, _15);

      case 5:
        a5_1.$sc = _9;
        a5_1._loop1.$r = a5_1, a5_1._loop1.$rstep = _10;
        a5_1._loop.$r = a5_1, a5_1._loop.$rstep = _11;
        a5_1._fe = _12, a5_1._fe1 = _12, a5_1._r = 10;
        return M.jump(void 0, _15);

      case 6:
        a5_1.$yld = _3;
        return M.jumpR(void 0, _16);

      case 7:
        return M.yldStar(M.yld(7), _16);

      case 8:
        return M.yldStar(M.yld(8), _16);

      case 9:
        return M.yldStar(M.yld(9), _16);

      case 10:
        return M.yldStar(M.yld(10), _16);

      case 11:
        return M.yldStar(M.yld(11), _16);

      case 12:
        return M.yldStar(M.yld(12), _16);

      default:
        a5_1.$yld = _3;
        return M.jumpR(void 0, _16);
    }
  }

  function _5(a5_1, a) {
    a5_1.$sc = _9;
    a5_1._loop1.$r = a5_1._loop.$s, a5_1._loop1.$rstep = a5_1._loop.$s.$step;
    a5_1._fe = _15;
    return M.jump(void 0, _15);
  }

  function _6(a5_1, a) {
    a5_1.$sc = _9;
    a5_1._loop1.$r = a5_1._loop.$s, a5_1._loop1.$rstep = a5_1._loop.$s.$step;
    a5_1._fe = _15;
    return M.jump(void 0, _15);
  }

  function _7(a5_1, a) {
    a5_1.$sc = _9;
    a5_1._loop1.$r = a5_1, a5_1._loop1.$rstep = _10;
    a5_1._loop.$r = a5_1, a5_1._loop.$rstep = _11;
    a5_1._fe = _12, a5_1._fe1 = _12;
    return M.jump(void 0, _15);
  }

  function _8(a5_1, a) {
    a5_1.$sc = _9;
    a5_1._loop1.$r = a5_1, a5_1._loop1.$rstep = _10;
    a5_1._loop.$r = a5_1, a5_1._loop.$rstep = _11;
    a5_1._fe = _12, a5_1._fe1 = _12, a5_1._r = 10;
    return M.jump(void 0, _15);
  }

  function _9(a5_1, a) {
    return a5_1._loop1.$exit();
  }

  function _10(a5_1, a) {
    return a5_1._loop.$exit();
  }

  function _11(a5_1) {
    a5_1.$r.$res = a5_1.$rstep, a5_1.$i.$yld = a5_1.$iyld;
    return M.$res(a5_1._r);
  }

  function _12(a5_1, e) {
    a5_1.$i.$yld = a5_1.$iyld;
    return M.true(e);
  }

  function _13(a5_1) {
    a5_1.$i.$yld = a5_1.$iyld;
    return M.true(a5_1._err1);
  }

  function _14(a5_1) {
    a5_1.$i.$yld = a5_1.$iyld;
    return M.true(a5_1._err2);
  }

  function _15(a5_1, a) {
    a5_1.$sc = _10;
    a5_1._loop.$r = a5_1, a5_1._loop.$rstep = _13;
    a5_1._fe1 = _12, a5_1._err1 = a;
    return M.jump(void 0, _12);
  }

  function _16(a5_1, a) {
    a5_1.$sc = _9;
    a5_1._loop1.$r = a5_1, a5_1._loop1.$rstep = _10;
    a5_1._loop.$r = a5_1, a5_1._loop.$rstep = _14;
    a5_1._fe = _12, a5_1._fe1 = _12, a5_1._err2 = a;
    return M.jump(void 0, _15);
  }
}

function a5_2(i) {
  var a5_2 = M.context();
  a5_2._i = i;
  a5_2.$sc = _1;
  return M.scope(_16);

  function _1(a5_2) {
    a5_2._fc2 = _15, a5_2._loop = M.$delegate(some, a5_2, a5_2, a5_2._fc2);
    a5_2.$yld = _2;
    return M.jump(void 0, _20);
  }

  function _2(a5_2, i) {
    a5_2._loop.$s = a5_2.unwrap.$t;
    {
      a5_2._i1 = i;
      a5_2._fc1 = _2, a5_2._loop1 = M.$delegate(a5_2._i1, a5_2, a5_2._loop.$s, a5_2._loop.$s.true, _2);
      a5_2.$yld = _3;
      return M.jumpR(void 0, _21);
    }
  }

  function _3(a5_2, i) {
    a5_2._loop1.$s = a5_2.unwrap.$t;
    {
      a5_2._j = i;
      a5_2.$sc = _4;
      return M.jumpR(void 0, _22);
    }
  }

  function _4(a5_2, a) {
    return M.yldStar(M.yld(a5_2._i1), _22);
  }

  function _5(a5_2, a) {
    switch (a) {
      case 1:
        a5_2.$sc = _12;
        a5_2._fx = a5_2._loop1, a5_2._fc = _3;
        a5_2._fe = _21;
        return M.jumpR(void 0, _21);

      case 2:
        a5_2.$sc = _12;
        a5_2._fx = a5_2, a5_2._fc = _13;
        a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
        a5_2._fe = _20, a5_2._fe1 = _20;
        return M.jumpR(void 0, _21);

      case 3:
        a5_2.$sc = _12;
        a5_2._fx = a5_2, a5_2._fc = _13;
        a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
        a5_2._fe = _20, a5_2._fe1 = _20;
        return M.jumpR(void 0, _21);

      case 4:
        a5_2.$sc = _12;
        a5_2._fx = a5_2, a5_2._fc = _13;
        a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
        a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
        a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16;
        return M.jumpR(void 0, _21);

      case 5:
        a5_2.$sc = _12;
        a5_2._fx = a5_2, a5_2._fc = _13;
        a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
        a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
        a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._r = 10;
        return M.jumpR(void 0, _21);

      case 6:
        a5_2.$sc = _11;
        return M.jumpR(void 0, _22);

      case 7:
        return M.yldStar(M.yld(7), _22);

      case 8:
        return M.yldStar(M.yld(8), _22);

      case 9:
        return M.yldStar(M.yld(9), _22);

      case 10:
        return M.yldStar(M.yld(10), _22);

      case 11:
        return M.yldStar(M.yld(11), _22);

      case 12:
        return M.yldStar(M.yld(12), _22);

      default:
        a5_2.$sc = _11;
        return M.jumpR(void 0, _22);
    }
  }

  function _6(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._fx = a5_2._loop1, a5_2._fc = _3;
    a5_2._fe = _21;
    return M.jumpR(void 0, _21);
  }

  function _7(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._fx = a5_2, a5_2._fc = _13;
    a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
    a5_2._fe = _20, a5_2._fe1 = _20;
    return M.jumpR(void 0, _21);
  }

  function _8(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._fx = a5_2, a5_2._fc = _13;
    a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
    a5_2._fe = _20, a5_2._fe1 = _20;
    return M.jumpR(void 0, _21);
  }

  function _9(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._fx = a5_2, a5_2._fc = _13;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
    a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16;
    return M.jumpR(void 0, _21);
  }

  function _10(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._fx = a5_2, a5_2._fc = _13;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
    a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._r = 10;
    return M.jumpR(void 0, _21);
  }

  function _11(a5_2) {
    a5_2._fx = a5_2._loop1, a5_2._fc = _3;
    a5_2._fe = _21;
    return M.yldStar(M.yld(a5_2._i1), _21);
  }

  function _12(a5_2) {
    console.log('F');
    a5_2.$sc = a5_2._fc;
    return a5_2._fx.true();
  }

  function _13(a5_2, a) {
    return a5_2._loop1.$exit();
  }

  function _14(a5_2, a) {
    return a5_2._loop.$exit();
  }

  function _15(a5_2) {
    a5_2.$r.$res = a5_2.$rstep, a5_2.$i.$yld = a5_2.$iyld;
    return M.$res(a5_2._r);
  }

  function _16(a5_2, e) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(e);
  }

  function _17(a5_2) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(a5_2._err1);
  }

  function _18(a5_2) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(a5_2._err2);
  }

  function _19(a5_2) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(a5_2._err3);
  }

  function _20(a5_2, a) {
    a5_2.$sc = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _17;
    a5_2._fe2 = _16, a5_2._err1 = a;
    return M.jump(void 0, _16);
  }

  function _21(a5_2, a) {
    a5_2.$sc = _13;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _18;
    a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._err2 = a;
    return M.jump(void 0, _20);
  }

  function _22(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._fx = a5_2, a5_2._fc = _13;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _19;
    a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._err3 = a;
    return M.jump(void 0, _21);
  }
}

function a5_2(i) {
  var a5_2 = M.context();
  a5_2._i = i;
  a5_2.$sc = _1;
  return M.scope(_16);

  function _1(a5_2) {
    a5_2._fc2 = _15, a5_2._loop = M.$delegate(some, a5_2, a5_2, a5_2._fc2);
    a5_2.$yld = _2;
    return M.jump(void 0, _20);
  }

  function _2(a5_2, i) {
    a5_2._loop.$s = a5_2.unwrap.$t;
    {
      a5_2._i1 = i;
      a5_2._fc1 = _2, a5_2._loop1 = M.$delegate(a5_2._i1, a5_2, a5_2._loop.$s, a5_2._loop.$s.true, _2);
      a5_2.$yld = _3;
      return M.jumpR(void 0, _21);
    }
  }

  function _3(a5_2, i) {
    a5_2._loop1.$s = a5_2.unwrap.$t;
    {
      a5_2._j = i;
      a5_2.$sc = _4;
      return M.jumpR(void 0, _22);
    }
  }

  function _4(a5_2, a) {
    return M.yldStar(M.yld(a5_2._i1), _22);
  }

  function _5(a5_2, a) {
    switch (a) {
      case 1:
        a5_2.$sc = _12;
        a5_2._fc = _3, a5_2._fe = _21;
        return M.jumpR(void 0, _21);

      case 2:
        a5_2.$sc = _12;
        a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
        a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _20;
        return M.jumpR(void 0, _21);

      case 3:
        a5_2.$sc = _12;
        a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
        a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _20;
        return M.jumpR(void 0, _21);

      case 4:
        a5_2.$sc = _12;
        a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
        a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
        a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16;
        return M.jumpR(void 0, _21);

      case 5:
        a5_2.$sc = _12;
        a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
        a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
        a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._r = 10;
        return M.jumpR(void 0, _21);

      case 6:
        a5_2.$sc = _11;
        return M.jumpR(void 0, _22);

      case 7:
        return M.yldStar(M.yld(7), _22);

      case 8:
        return M.yldStar(M.yld(8), _22);

      case 9:
        return M.yldStar(M.yld(9), _22);

      case 10:
        return M.yldStar(M.yld(10), _22);

      case 11:
        return M.yldStar(M.yld(11), _22);

      case 12:
        return M.yldStar(M.yld(12), _22);

      default:
        a5_2.$sc = _11;
        return M.jumpR(void 0, _22);
    }
  }

  function _6(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._fc = _3, a5_2._fe = _21;
    return M.jumpR(void 0, _21);
  }

  function _7(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
    a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _20;
    return M.jumpR(void 0, _21);
  }

  function _8(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._loop1.$r = a5_2._loop.$s, a5_2._loop1.$rstep = a5_2._loop.$s.$step;
    a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _20;
    return M.jumpR(void 0, _21);
  }

  function _9(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
    a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16;
    return M.jumpR(void 0, _21);
  }

  function _10(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _15;
    a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._r = 10;
    return M.jumpR(void 0, _21);
  }

  function _11(a5_2) {
    a5_2._fc = _3, a5_2._fe = _21;
    return M.yldStar(M.yld(a5_2._i1), _21);
  }

  function _12(a5_2) {
    a5_2._err2 = a5_2._err3;
    return M.yldStar(M.yld('F'), a5_2._fe);
  }

  function _13(a5_2) {
    return a5_2._loop1.$exit();
  }

  function _14(a5_2, a) {
    return a5_2._loop.$exit();
  }

  function _15(a5_2) {
    a5_2.$r.$res = a5_2.$rstep, a5_2.$i.$yld = a5_2.$iyld;
    return M.$res(a5_2._r);
  }

  function _16(a5_2, e) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(e);
  }

  function _17(a5_2) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(a5_2._err1);
  }

  function _18(a5_2) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(a5_2._err2);
  }

  function _19(a5_2) {
    a5_2.$i.$yld = a5_2.$iyld;
    return M.true(a5_2._err3);
  }

  function _20(a5_2, a) {
    a5_2.$sc = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _17;
    a5_2._fe2 = _16, a5_2._err1 = a;
    return M.jump(void 0, _16);
  }

  function _21(a5_2, a) {
    a5_2.$sc = _13;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _18;
    a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._err2 = a;
    return M.jump(void 0, _20);
  }

  function _22(a5_2, a) {
    a5_2.$sc = _12;
    a5_2._loop1.$r = a5_2, a5_2._loop1.$rstep = _14;
    a5_2._loop.$r = a5_2, a5_2._loop.$rstep = _19;
    a5_2._fc = _13, a5_2._fe = _20, a5_2._fe1 = _16, a5_2._fe2 = _16, a5_2._err3 = a;
    return M.jump(void 0, _21);
  }
}