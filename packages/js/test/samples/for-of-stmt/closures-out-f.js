function forOfBlockScope() {
  var a, b, funs, i, j, _i, k, _k, k1, k2, i1, i2, _j, i3, j1, i4, j2, i5, j3, i6, i7, i8, i9, j4, i10, j5, i11, j6, i12, j7, i13, j8, i14, j9, br, loop, e, _loop, _e, loop1, e1, loop2, e2, loop3, e3, loop4, e4, loop5, e5, loop6, e6, loop7, e7, loop8, e8, loop9, e9, ex, _ex, ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, r;

  return M.scopeH(_1, _48);

  function _1() {
    a = [1, 2, 3, 4, 5, 6, 7, 8];
    b = [10, 11, 12, 13, 14, 15, 16];
    funs = [];

    for (i1 of a) {
      (i => {
        let j = 0;
        funs.push(function iter() {
          return M.scopeH(_1, _3);

          function _1() {
            return M.yldStarBH(M.yld(`fo1: ${i} ${j++}`), _2, _3);
          }

          function _2() {
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        });
      })(i1);
    }

    for (i of a) {
      j = 0;
      funs.push(function iter() {
        return M.scopeH(_1, _3);

        function _1() {
          return M.yldStarBH(M.yld(`fo2: ${i} ${j++}`), _2, _3);
        }

        function _2() {
          return M.pure();
        }

        function _3(e) {
          return M.raise(e);
        }
      });
    }

    for (i2 of a) {
      (i => {
        for (let _j of b) {
          (j => {
            funs.push(function iter() {
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo3: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
          })(_j);
        }
      })(i2);
    }

    loop = M.iterator(a);
    return M.jumpH(_2, _48);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i3 = loop.value;
      return M.jumpRH(_3, _49);
    } else {
      _loop = M.iterator(a);
      return M.jumpH(_5, _48);
    }
  }

  function _3() {
    return M.yldStarBH((i => {
      var j1, loop, e, ex;
      return M.scopeH(_1, _5);

      function _1() {
        loop = M.iterator(b);
        return M.jumpH(_2, _5);
      }

      function _2() {
        if (!(loop = loop.step()).done) {
          j1 = loop.value;
          return M.jumpRH(_3, _6);
        } else {
          return M.pure();
        }
      }

      function _3() {
        return M.yldStarBH((j => {
          return M.scopeH(_1, _3);

          function _1() {
            return M.yldStarBH(M.yld(`fo4: ${j}`), _2, _3);
          }

          function _2() {
            funs.push(function iter() {
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo5: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j1), _2, _5);
      }

      function _4() {
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _5(e) {
        return M.raise(e);
      }

      function _6(a) {
        ex = a;
        return M.jumpH(_4, _5);
      }
    })(i3), _2, _48);
  }

  function _4() {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _5() {
    if (!(_loop = _loop.step()).done) {
      i4 = _loop.value;
      return M.jumpRH(_6, _50);
    } else {
      loop1 = M.iterator(a);
      return M.jumpH(_8, _48);
    }
  }

  function _6() {
    return M.yldStarBH((i => {
      var j2;
      return M.scopeH(_1, _3);

      function _1() {
        return M.yldStarBH(M.yld(`fo6: ${i}`), _2, _3);
      }

      function _2() {
        for (j2 of b) {
          (j => {
            funs.push(function iter() {
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo7: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
          })(j2);
        }

        return M.pure();
      }

      function _3(e) {
        return M.raise(e);
      }
    })(i4), _5, _48);
  }

  function _7() {
    _e = _ex;

    if (_loop.exit) {
      _loop.exit();
    }

    throw _e;
  }

  function _8() {
    if (!(loop1 = loop1.step()).done) {
      i5 = loop1.value;
      return M.jumpRH(_9, _51);
    } else {
      loop2 = M.iterator(funs);
      return M.jumpH(_11, _48);
    }
  }

  function _9() {
    return M.yldStarBH((i => {
      var j3, loop, e, ex;
      return M.scopeH(_1, _6);

      function _1() {
        return M.yldStarBH(M.yld(`fo8 ${i}`), _2, _6);
      }

      function _2() {
        loop = M.iterator(b);
        return M.jumpH(_3, _6);
      }

      function _3() {
        if (!(loop = loop.step()).done) {
          j3 = loop.value;
          return M.jumpRH(_4, _7);
        } else {
          return M.pure();
        }
      }

      function _4() {
        return M.yldStarBH((j => {
          return M.scopeH(_1, _3);

          function _1() {
            return M.yldStarBH(M.yld(`fo9: ${i}`), _2, _3);
          }

          function _2() {
            funs.push(function iter() {
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo10: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j3), _3, _6);
      }

      function _5() {
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _6(e) {
        return M.raise(e);
      }

      function _7(a) {
        ex = a;
        return M.jumpH(_5, _6);
      }
    })(i5), _8, _48);
  }

  function _10() {
    e1 = ex1;

    if (loop1.exit) {
      loop1.exit();
    }

    throw e1;
  }

  function _11() {
    if (!(loop2 = loop2.step()).done) {
      _i = loop2.value;
      return M.jumpRH(_12, _52);
    } else {
      funs.length = 0;

      for (i6 of a) {
        (i => {
          funs.push(function iter() {
            return M.scopeH(_1, _3);

            function _1() {
              return M.yldStarBH(M.yld(`fo11: ${i}`), _2, _3);
            }

            function _2() {
              return M.pure();
            }

            function _3(e) {
              return M.raise(e);
            }
          });
        })(i6);
      }

      loop3 = M.iterator(a);
      return M.jumpH(_14, _48);
    }
  }

  function _12() {
    var a;
    a = _i();
    return M.yldStarBH(M.yldStar(a), _11, _48);
  }

  function _13() {
    e2 = ex2;

    if (loop2.exit) {
      loop2.exit();
    }

    throw e2;
  }

  function _14() {
    if (!(loop3 = loop3.step()).done) {
      i7 = loop3.value;
      return M.jumpRH(_15, _53);
    } else {
      k = 0;
      loop4 = M.iterator(a);
      return M.jumpH(_17, _48);
    }
  }

  function _15() {
    return M.yldStarBH((i => {
      return M.scopeH(_1, _3);

      function _1() {
        return M.yldStarBH(M.yld(`fo12 ${i}`), _2, _3);
      }

      function _2() {
        funs.push(function iter() {
          return M.scopeH(_1, _3);

          function _1() {
            return M.yldStarBH(M.yld(`fo13 ${i}`), _2, _3);
          }

          function _2() {
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        });
        return M.pure();
      }

      function _3(e) {
        return M.raise(e);
      }
    })(i7), _14, _48);
  }

  function _16() {
    e3 = ex3;

    if (loop3.exit) {
      loop3.exit();
    }

    throw e3;
  }

  function _17() {
    if (!(loop4 = loop4.step()).done) {
      i8 = loop4.value;
      return M.jumpRH(_18, _54);
    } else {
      return M.jumpH(_21, _48);
    }
  }

  function _18() {
    return M.yldStarBH((i => {
      var m, r;
      return M.scopeH(_1, _3);

      function _1() {
        return M.yldStarBH(M.yld(`fo14 ${i} ${k} {m}`), _2, _3);
      }

      function _2() {
        m = k;
        k++;

        if (k === 3) {
          return M.pure(0);
        } else {
          if (k === 5) {
            return M.pure(1);
          } else {
            funs.push(function iter() {
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo15 ${i} ${k} {m}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
            return M.pure(r);
          }
        }
      }

      function _3(e) {
        return M.raise(e);
      }
    })(i8), _19, _54);
  }

  function _19(a) {
    switch (a) {
      case 0:
        return M.jumpRH(_17, _48);

      case 1:
        return M.jumpH(_21, _48);

      default:
        return M.jumpRH(_17, _48);
    }
  }

  function _20() {
    e4 = ex4;

    if (loop4.exit) {
      loop4.exit();
    }

    throw e4;
  }

  function _21() {
    k = 0;

    up1: for (i9 of a) {
      switch ((i => {
        let m = k;
        k++;

        for (const j4 of b) {
          switch ((j => {
            let n = m;
            m++;
            if (k === 3) return 0;
            if (k === 5) return 1;
            if (n === 3) return 2;
            if (n === 5) return 3;
            funs.push(function iter() {
              return M.scopeH(_1, _3);

              function _1() {
                n++;
                return M.yldStarBH(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
          })(j4)) {
            case 0:
              return 0;

            case 1:
              return 1;

            case 2:
              continue;

            case 3:
              break;

            default:
              continue;
          }

          break;
        }
      })(i9)) {
        case 0:
          {
            continue up1;
          }

        case 1:
          {
            break up1;
          }

        default:
          {
            continue;
          }
      }
    }

    k = 0;
    loop5 = M.iterator(a);
    return M.jumpH(_22, _48);
  }

  function _22() {
    if (!(loop5 = loop5.step()).done) {
      i10 = loop5.value;
      return M.jumpRH(_23, _55);
    } else {
      return M.jumpH(_26, _48);
    }
  }

  function _23() {
    return M.yldStarBH((i => {
      var m, j5, loop, e, ex, r;
      return M.scopeH(_1, _7);

      function _1() {
        m = 0;
        k++;
        return M.yldStarBH(M.yld(`fo16: ${i} ${k} ${m}`), _2, _7);
      }

      function _2() {
        loop = M.iterator(b);
        return M.jumpH(_3, _7);
      }

      function _3() {
        if (!(loop = loop.step()).done) {
          j5 = loop.value;
          return M.jumpRH(_4, _8);
        } else {
          return M.pure(r);
        }
      }

      function _4() {
        return M.yldStarBH((j => {
          var n, r;
          return M.scopeH(_1, _2);

          function _1() {
            n = m;
            m++;

            if (k === 3) {
              return M.pure(0);
            } else {
              if (k === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scopeH(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStarBH(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _2(e) {
            return M.raise(e);
          }
        })(j5), _5, _8);
      }

      function _5(a) {
        switch (a) {
          case 0:
            return M.pure(0);

          case 1:
            return M.pure(1);

          case 2:
            return M.jumpRH(_3, _7);

          case 3:
            return M.pure(r);

          default:
            return M.jumpRH(_3, _7);
        }
      }

      function _6() {
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        ex = a;
        return M.jumpH(_6, _7);
      }
    })(i10), _24, _55);
  }

  function _24(a) {
    switch (a) {
      case 0:
        return M.jumpRH(_22, _48);

      case 1:
        return M.jumpH(_26, _48);

      default:
        return M.jumpRH(_22, _48);
    }
  }

  function _25() {
    e5 = ex5;

    if (loop5.exit) {
      loop5.exit();
    }

    throw e5;
  }

  function _26() {
    k = 0;
    loop6 = M.iterator(a);
    return M.jumpH(_27, _48);
  }

  function _27() {
    if (!(loop6 = loop6.step()).done) {
      i11 = loop6.value;
      return M.jumpRH(_28, _56);
    } else {
      return M.jumpH(_31, _48);
    }
  }

  function _28() {
    return M.yldStarBH((i => {
      var m, j6, loop, e, ex, r;
      return M.scopeH(_1, _6);

      function _1() {
        m = 0;
        k++;
        loop = M.iterator(b);
        return M.jumpH(_2, _6);
      }

      function _2() {
        if (!(loop = loop.step()).done) {
          j6 = loop.value;
          return M.jumpRH(_3, _7);
        } else {
          return M.pure(r);
        }
      }

      function _3() {
        return M.yldStarBH((j => {
          var n, r;
          return M.scopeH(_1, _3);

          function _1() {
            n = m;
            m++;
            return M.yldStarBH(M.yld(`fo19 ${i} ${j} ${k} ${m} ${n}`), _2, _3);
          }

          function _2() {
            if (k === 3) {
              return M.pure(0);
            } else {
              if (k === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scopeH(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStarBH(M.yld(`fo20: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j6), _4, _7);
      }

      function _4(a) {
        switch (a) {
          case 0:
            return M.pure(0);

          case 1:
            return M.pure(1);

          case 2:
            return M.jumpRH(_2, _6);

          case 3:
            return M.pure(r);

          default:
            return M.jumpRH(_2, _6);
        }
      }

      function _5() {
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _6(e) {
        return M.raise(e);
      }

      function _7(a) {
        ex = a;
        return M.jumpH(_5, _6);
      }
    })(i11), _29, _56);
  }

  function _29(a) {
    switch (a) {
      case 0:
        return M.jumpRH(_27, _48);

      case 1:
        return M.jumpH(_31, _48);

      default:
        return M.jumpRH(_27, _48);
    }
  }

  function _30() {
    e6 = ex6;

    if (loop6.exit) {
      loop6.exit();
    }

    throw e6;
  }

  function _31() {
    _k = 0;
    return M.yldStarBH(M.yld(`fo21: ${i} ${_k}`), _32, _48);
  }

  function _32() {
    loop7 = M.iterator(a);
    return M.jumpH(_33, _48);
  }

  function _33() {
    if (!(loop7 = loop7.step()).done) {
      i12 = loop7.value;
      return M.jumpRH(_34, _57);
    } else {
      return M.jumpH(_37, _48);
    }
  }

  function _34() {
    return M.yldStarBH((i => {
      var m, j7, loop, e, ex, r;
      return M.scopeH(_1, _7);

      function _1() {
        m = 0;
        _k++;
        return M.yldStarBH(M.yld(`fo22: ${i} ${_k} ${m}`), _2, _7);
      }

      function _2() {
        loop = M.iterator(b);
        return M.jumpH(_3, _7);
      }

      function _3() {
        if (!(loop = loop.step()).done) {
          j7 = loop.value;
          return M.jumpRH(_4, _8);
        } else {
          return M.pure(r);
        }
      }

      function _4() {
        return M.yldStarBH((j => {
          var n, r;
          return M.scopeH(_1, _3);

          function _1() {
            n = m;
            m++;
            return M.yldStarBH(M.yld(`fo23 ${i} ${j} ${_k} ${m} ${n}`), _2, _3);
          }

          function _2() {
            if (_k === 3) {
              return M.pure(0);
            } else {
              if (_k === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scopeH(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStarBH(M.yld(`fo24: ${i} ${j} ${_k} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j7), _5, _8);
      }

      function _5(a) {
        switch (a) {
          case 1:
            return M.pure(0);

          case 0:
            return M.pure(1);

          case 2:
            return M.jumpRH(_3, _7);

          case 3:
            return M.pure(r);

          default:
            return M.jumpRH(_3, _7);
        }
      }

      function _6() {
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        ex = a;
        return M.jumpH(_6, _7);
      }
    })(i12), _35, _57);
  }

  function _35(a) {
    switch (a) {
      case 0:
        return M.jumpH(_37, _48);

      case 1:
        return M.jumpRH(_33, _48);

      default:
        return M.jumpRH(_33, _48);
    }
  }

  function _36() {
    e7 = ex7;

    if (loop7.exit) {
      loop7.exit();
    }

    throw e7;
  }

  function _37() {
    k1 = 0;
    return M.yldStarBH(M.yld(`fo25`), _38, _48);
  }

  function _38() {
    loop8 = M.iterator(a);
    return M.jumpH(_39, _48);
  }

  function _39() {
    if (!(loop8 = loop8.step()).done) {
      i13 = loop8.value;
      return M.jumpRH(_40, _58);
    } else {
      return M.jumpH(_43, _48);
    }
  }

  function _40() {
    return M.yldStarBH((i => {
      var m, j8, loop, e, ex, r;
      return M.scopeH(_1, _7);

      function _1() {
        m = 0;
        k1++;
        return M.yldStarBH(M.yld(`fo26: ${i} ${k1} ${m}`), _2, _7);
      }

      function _2() {
        loop = M.iterator(b);
        return M.jumpH(_3, _7);
      }

      function _3() {
        if (!(loop = loop.step()).done) {
          j8 = loop.value;
          return M.jumpRH(_4, _8);
        } else {
          return M.pure(r);
        }
      }

      function _4() {
        return M.yldStarBH((j => {
          var n, r;
          return M.scopeH(_1, _3);

          function _1() {
            n = m;
            m++;
            return M.yldStarBH(M.yld(`fo27 ${i} ${j} ${k1} ${m} ${n}`), _2, _3);
          }

          function _2() {
            if (k1 === 3) {
              return M.pure(0);
            } else {
              if (k1 === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scopeH(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStarBH(M.yld(`fo28: ${i} ${j} ${k1} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j8), _5, _8);
      }

      function _5(a) {
        switch (a) {
          case 1:
            return M.pure(0);

          case 0:
            return M.pure(1);

          case 2:
            return M.jumpRH(_3, _7);

          case 3:
            return M.pure(r);

          default:
            return M.jumpRH(_3, _7);
        }
      }

      function _6() {
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        ex = a;
        return M.jumpH(_6, _7);
      }
    })(i13), _41, _58);
  }

  function _41(a) {
    switch (a) {
      case 0:
        return M.jumpH(_43, _48);

      case 1:
        return M.jumpRH(_39, _48);

      default:
        return M.jumpRH(_39, _48);
    }
  }

  function _42() {
    e8 = ex8;

    if (loop8.exit) {
      loop8.exit();
    }

    throw e8;
  }

  function _43() {
    k2 = 0;
    loop9 = M.iterator(a);
    return M.jumpH(_44, _48);
  }

  function _44() {
    if (!(loop9 = loop9.step()).done) {
      i14 = loop9.value;
      return M.jumpRH(_45, _59);
    } else {
      return M.pure(r);
    }
  }

  function _45() {
    return M.yldStarBH((i => {
      var m, j9, loop, e, ex, r;
      return M.scopeH(_1, _7);

      function _1() {
        m = 0;
        k2++;
        return M.yldStarBH(M.yld(`fo29: ${i} ${k2} ${m}`), _2, _7);
      }

      function _2() {
        loop = M.iterator(b);
        return M.jumpH(_3, _7);
      }

      function _3() {
        if (!(loop = loop.step()).done) {
          j9 = loop.value;
          return M.jumpRH(_4, _8);
        } else {
          return M.pure(r);
        }
      }

      function _4() {
        return M.yldStarBH((j => {
          var n, _i, loop, e, ex, r;

          return M.scopeH(_1, _6);

          function _1() {
            n = m;
            m++;
            return M.yldStarBH(M.yld(`fo30 ${i} ${j} ${k2} ${m} ${n}`), _2, _6);
          }

          function _2() {
            if (k2 === 3) {
              return M.pure(0);
            } else {
              if (k2 === 5) {
                loop = M.iterator(funs);
                return M.jumpH(_3, _6);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scopeH(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStarBH(M.yld(`fo31: ${i} ${j} ${k2} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3() {
            if (!(loop = loop.step()).done) {
              _i = loop.value;
              return M.jumpRH(_4, _7);
            } else {
              return M.pure((br = `r: ${i} ${j} ${k2} ${m} ${n}`, 1));
            }
          }

          function _4() {
            var a;
            a = _i();
            return M.yldStarBH(M.yldStar(a), _3, _6);
          }

          function _5() {
            e = ex;

            if (loop.exit) {
              loop.exit();
            }

            throw e;
          }

          function _6(e) {
            return M.raise(e);
          }

          function _7(a) {
            ex = a;
            return M.jumpH(_5, _6);
          }
        })(j9), _5, _8);
      }

      function _5(a) {
        switch (a) {
          case 1:
            return M.pure(0);

          case 0:
            return M.pure(1);

          case 2:
            return M.jumpRH(_3, _7);

          case 3:
            return M.pure(r);

          default:
            return M.jumpRH(_3, _7);
        }
      }

      function _6() {
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        ex = a;
        return M.jumpH(_6, _7);
      }
    })(i14), _46, _59);
  }

  function _46(a) {
    switch (a) {
      case 0:
        return M.pure(br);

      case 1:
        return M.jumpRH(_44, _48);

      default:
        return M.jumpRH(_44, _48);
    }
  }

  function _47() {
    e9 = ex9;

    if (loop9.exit) {
      loop9.exit();
    }

    throw e9;
  }

  function _48(e) {
    return M.raise(e);
  }

  function _49(a) {
    ex = a;
    return M.jumpH(_4, _48);
  }

  function _50(a) {
    _ex = a;
    return M.jumpH(_7, _48);
  }

  function _51(a) {
    ex1 = a;
    return M.jumpH(_10, _48);
  }

  function _52(a) {
    ex2 = a;
    return M.jumpH(_13, _48);
  }

  function _53(a) {
    ex3 = a;
    return M.jumpH(_16, _48);
  }

  function _54(a) {
    ex4 = a;
    return M.jumpH(_20, _48);
  }

  function _55(a) {
    ex5 = a;
    return M.jumpH(_25, _48);
  }

  function _56(a) {
    ex6 = a;
    return M.jumpH(_30, _48);
  }

  function _57(a) {
    ex7 = a;
    return M.jumpH(_36, _48);
  }

  function _58(a) {
    ex8 = a;
    return M.jumpH(_42, _48);
  }

  function _59(a) {
    ex9 = a;
    return M.jumpH(_47, _48);
  }
}