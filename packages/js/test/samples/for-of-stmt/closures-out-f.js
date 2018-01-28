function forOfBlockScope() {
  var a, b, funs, i, j, _i, k, _k, k1, k2, i1, i2, _j, i3, j1, i4, j2, i5, j3, i6, i7, i8, i9, j4, i10, j5, i11, j6, i12, j7, i13, j8, i14, j9, br, loop, _loop, loop1, loop2, loop3, loop4, loop5, loop6, loop7, loop8, loop9, fc, fe, _fc, _fe, fc1, fe1, fc2, fe2, fc3, fe3, fc4, fe4, fc5, fe5, fc6, fe6, fc7, fe7, fc8, fe8, fc9, fe9, r, err, _err, err1, err2, err3, err4, err5, err6, err7, err8, err9;

  return M.scopeH(_1, _43);

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
    return M.jumpH(_2, _55);
  }

  function _2() {
    var a;

    if (!(loop = loop.step()).done) {
      i3 = loop.value;

      a = (i => {
        var j1, loop, fc, fe, err;
        return M.scopeH(_1, _5);

        function _1() {
          loop = M.iterator(b);
          return M.jumpH(_2, _7);
        }

        function _2() {
          var a;

          if (!(loop = loop.step()).done) {
            j1 = loop.value;

            a = (j => {
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
            })(j1);

            return M.yldStarBH(M.yldStar(a), _2, _7);
          } else {
            fc = _4, fe = _5;
            return M.jumpH(_3, _5);
          }
        }

        function _3() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe);
        }

        function _4() {
          return M.pure();
        }

        function _5(e) {
          return M.raise(e);
        }

        function _6() {
          return M.raise(err);
        }

        function _7(a) {
          fc = _6, fe = _5, err = a;
          return M.jumpH(_3, _5);
        }
      })(i3);

      return M.yldStarBH(M.yldStar(a), _2, _55);
    } else {
      fc = _4, fe = _43;
      return M.jumpH(_3, _43);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jumpH(fc, fe);
  }

  function _4() {
    _loop = M.iterator(a);
    return M.jumpH(_5, _56);
  }

  function _5() {
    var a;

    if (!(_loop = _loop.step()).done) {
      i4 = _loop.value;

      a = (i => {
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
      })(i4);

      return M.yldStarBH(M.yldStar(a), _5, _56);
    } else {
      _fc = _7, _fe = _43;
      return M.jumpH(_6, _43);
    }
  }

  function _6() {
    if (_loop.exit) {
      _loop.exit();
    }

    return M.jumpH(_fc, _fe);
  }

  function _7() {
    loop1 = M.iterator(a);
    return M.jumpH(_8, _57);
  }

  function _8() {
    var a;

    if (!(loop1 = loop1.step()).done) {
      i5 = loop1.value;

      a = (i => {
        var j3, loop, fc, fe, err;
        return M.scopeH(_1, _6);

        function _1() {
          return M.yldStarBH(M.yld(`fo8 ${i}`), _2, _6);
        }

        function _2() {
          loop = M.iterator(b);
          return M.jumpH(_3, _8);
        }

        function _3() {
          var a;

          if (!(loop = loop.step()).done) {
            j3 = loop.value;

            a = (j => {
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
            })(j3);

            return M.yldStarBH(M.yldStar(a), _3, _8);
          } else {
            fc = _5, fe = _6;
            return M.jumpH(_4, _6);
          }
        }

        function _4() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe);
        }

        function _5() {
          return M.pure();
        }

        function _6(e) {
          return M.raise(e);
        }

        function _7() {
          return M.raise(err);
        }

        function _8(a) {
          fc = _7, fe = _6, err = a;
          return M.jumpH(_4, _6);
        }
      })(i5);

      return M.yldStarBH(M.yldStar(a), _8, _57);
    } else {
      fc1 = _10, fe1 = _43;
      return M.jumpH(_9, _43);
    }
  }

  function _9() {
    if (loop1.exit) {
      loop1.exit();
    }

    return M.jumpH(fc1, fe1);
  }

  function _10() {
    loop2 = M.iterator(funs);
    return M.jumpH(_11, _58);
  }

  function _11() {
    var a;

    if (!(loop2 = loop2.step()).done) {
      _i = loop2.value;
      a = _i();
      return M.yldStarBH(M.yldStar(a), _11, _58);
    } else {
      fc2 = _13, fe2 = _43;
      return M.jumpH(_12, _43);
    }
  }

  function _12() {
    if (loop2.exit) {
      loop2.exit();
    }

    return M.jumpH(fc2, fe2);
  }

  function _13() {
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
    return M.jumpH(_14, _59);
  }

  function _14() {
    var a;

    if (!(loop3 = loop3.step()).done) {
      i7 = loop3.value;

      a = (i => {
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
      })(i7);

      return M.yldStarBH(M.yldStar(a), _14, _59);
    } else {
      fc3 = _16, fe3 = _43;
      return M.jumpH(_15, _43);
    }
  }

  function _15() {
    if (loop3.exit) {
      loop3.exit();
    }

    return M.jumpH(fc3, fe3);
  }

  function _16() {
    k = 0;
    loop4 = M.iterator(a);
    return M.jumpH(_17, _60);
  }

  function _17() {
    var a;

    if (!(loop4 = loop4.step()).done) {
      i8 = loop4.value;

      a = (i => {
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
      })(i8);

      return M.yldStarBH(M.yldStar(a), _18, _60);
    } else {
      fc4 = _20, fe4 = _43;
      return M.jumpH(_19, _43);
    }
  }

  function _18(a) {
    switch (a) {
      case 0:
        return M.jumpRH(_17, _60);

      case 1:
        fc4 = _20, fe4 = _43;
        return M.jumpH(_19, _43);

      default:
        return M.jumpRH(_17, _60);
    }
  }

  function _19() {
    if (loop4.exit) {
      loop4.exit();
    }

    return M.jumpH(fc4, fe4);
  }

  function _20() {
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
    return M.jumpH(_21, _61);
  }

  function _21() {
    var a;

    if (!(loop5 = loop5.step()).done) {
      i10 = loop5.value;

      a = (i => {
        var m, j5, loop, fc, fe, r, err;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          k++;
          return M.yldStarBH(M.yld(`fo16: ${i} ${k} ${m}`), _2, _7);
        }

        function _2() {
          loop = M.iterator(b);
          return M.jumpH(_3, _9);
        }

        function _3() {
          var a;

          if (!(loop = loop.step()).done) {
            j5 = loop.value;

            a = (j => {
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
            })(j5);

            return M.yldStarBH(M.yldStar(a), _4, _9);
          } else {
            fc = _6, fe = _7;
            return M.jumpH(_5, _7);
          }
        }

        function _4(a) {
          switch (a) {
            case 0:
              fc = _6, fe = _7, r = 0;
              return M.jumpH(_5, _7);

            case 1:
              fc = _6, fe = _7, r = 1;
              return M.jumpH(_5, _7);

            case 2:
              return M.jumpRH(_3, _9);

            case 3:
              fc = _6, fe = _7;
              return M.jumpH(_5, _7);

            default:
              return M.jumpRH(_3, _9);
          }
        }

        function _5() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe);
        }

        function _6() {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8() {
          return M.raise(err);
        }

        function _9(a) {
          fc = _8, fe = _7, err = a;
          return M.jumpH(_5, _7);
        }
      })(i10);

      return M.yldStarBH(M.yldStar(a), _22, _61);
    } else {
      fc5 = _24, fe5 = _43;
      return M.jumpH(_23, _43);
    }
  }

  function _22(a) {
    switch (a) {
      case 0:
        return M.jumpRH(_21, _61);

      case 1:
        fc5 = _24, fe5 = _43;
        return M.jumpH(_23, _43);

      default:
        return M.jumpRH(_21, _61);
    }
  }

  function _23() {
    if (loop5.exit) {
      loop5.exit();
    }

    return M.jumpH(fc5, fe5);
  }

  function _24() {
    k = 0;
    loop6 = M.iterator(a);
    return M.jumpH(_25, _62);
  }

  function _25() {
    var a;

    if (!(loop6 = loop6.step()).done) {
      i11 = loop6.value;

      a = (i => {
        var m, j6, loop, fc, fe, r, err;
        return M.scopeH(_1, _6);

        function _1() {
          m = 0;
          k++;
          loop = M.iterator(b);
          return M.jumpH(_2, _8);
        }

        function _2() {
          var a;

          if (!(loop = loop.step()).done) {
            j6 = loop.value;

            a = (j => {
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
            })(j6);

            return M.yldStarBH(M.yldStar(a), _3, _8);
          } else {
            fc = _5, fe = _6;
            return M.jumpH(_4, _6);
          }
        }

        function _3(a) {
          switch (a) {
            case 0:
              fc = _5, fe = _6, r = 0;
              return M.jumpH(_4, _6);

            case 1:
              fc = _5, fe = _6, r = 1;
              return M.jumpH(_4, _6);

            case 2:
              return M.jumpRH(_2, _8);

            case 3:
              fc = _5, fe = _6;
              return M.jumpH(_4, _6);

            default:
              return M.jumpRH(_2, _8);
          }
        }

        function _4() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe);
        }

        function _5() {
          return M.pure(r);
        }

        function _6(e) {
          return M.raise(e);
        }

        function _7() {
          return M.raise(err);
        }

        function _8(a) {
          fc = _7, fe = _6, err = a;
          return M.jumpH(_4, _6);
        }
      })(i11);

      return M.yldStarBH(M.yldStar(a), _26, _62);
    } else {
      fc6 = _28, fe6 = _43;
      return M.jumpH(_27, _43);
    }
  }

  function _26(a) {
    switch (a) {
      case 0:
        return M.jumpRH(_25, _62);

      case 1:
        fc6 = _28, fe6 = _43;
        return M.jumpH(_27, _43);

      default:
        return M.jumpRH(_25, _62);
    }
  }

  function _27() {
    if (loop6.exit) {
      loop6.exit();
    }

    return M.jumpH(fc6, fe6);
  }

  function _28() {
    _k = 0;
    return M.yldStarBH(M.yld(`fo21: ${i} ${_k}`), _29, _43);
  }

  function _29() {
    loop7 = M.iterator(a);
    return M.jumpH(_30, _63);
  }

  function _30() {
    var a;

    if (!(loop7 = loop7.step()).done) {
      i12 = loop7.value;

      a = (i => {
        var m, j7, loop, fc, fe, r, err;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          _k++;
          return M.yldStarBH(M.yld(`fo22: ${i} ${_k} ${m}`), _2, _7);
        }

        function _2() {
          loop = M.iterator(b);
          return M.jumpH(_3, _9);
        }

        function _3() {
          var a;

          if (!(loop = loop.step()).done) {
            j7 = loop.value;

            a = (j => {
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
            })(j7);

            return M.yldStarBH(M.yldStar(a), _4, _9);
          } else {
            fc = _6, fe = _7;
            return M.jumpH(_5, _7);
          }
        }

        function _4(a) {
          switch (a) {
            case 1:
              fc = _6, fe = _7, r = 0;
              return M.jumpH(_5, _7);

            case 0:
              fc = _6, fe = _7, r = 1;
              return M.jumpH(_5, _7);

            case 2:
              return M.jumpRH(_3, _9);

            case 3:
              fc = _6, fe = _7;
              return M.jumpH(_5, _7);

            default:
              return M.jumpRH(_3, _9);
          }
        }

        function _5() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe);
        }

        function _6() {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8() {
          return M.raise(err);
        }

        function _9(a) {
          fc = _8, fe = _7, err = a;
          return M.jumpH(_5, _7);
        }
      })(i12);

      return M.yldStarBH(M.yldStar(a), _31, _63);
    } else {
      fc7 = _33, fe7 = _43;
      return M.jumpH(_32, _43);
    }
  }

  function _31(a) {
    switch (a) {
      case 0:
        fc7 = _33, fe7 = _43;
        return M.jumpH(_32, _43);

      case 1:
        return M.jumpRH(_30, _63);

      default:
        return M.jumpRH(_30, _63);
    }
  }

  function _32() {
    if (loop7.exit) {
      loop7.exit();
    }

    return M.jumpH(fc7, fe7);
  }

  function _33() {
    k1 = 0;
    return M.yldStarBH(M.yld(`fo25`), _34, _43);
  }

  function _34() {
    loop8 = M.iterator(a);
    return M.jumpH(_35, _64);
  }

  function _35() {
    var a;

    if (!(loop8 = loop8.step()).done) {
      i13 = loop8.value;

      a = (i => {
        var m, j8, loop, fc, fe, r, err;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          k1++;
          return M.yldStarBH(M.yld(`fo26: ${i} ${k1} ${m}`), _2, _7);
        }

        function _2() {
          loop = M.iterator(b);
          return M.jumpH(_3, _9);
        }

        function _3() {
          var a;

          if (!(loop = loop.step()).done) {
            j8 = loop.value;

            a = (j => {
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
            })(j8);

            return M.yldStarBH(M.yldStar(a), _4, _9);
          } else {
            fc = _6, fe = _7;
            return M.jumpH(_5, _7);
          }
        }

        function _4(a) {
          switch (a) {
            case 1:
              fc = _6, fe = _7, r = 0;
              return M.jumpH(_5, _7);

            case 0:
              fc = _6, fe = _7, r = 1;
              return M.jumpH(_5, _7);

            case 2:
              return M.jumpRH(_3, _9);

            case 3:
              fc = _6, fe = _7;
              return M.jumpH(_5, _7);

            default:
              return M.jumpRH(_3, _9);
          }
        }

        function _5() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe);
        }

        function _6() {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8() {
          return M.raise(err);
        }

        function _9(a) {
          fc = _8, fe = _7, err = a;
          return M.jumpH(_5, _7);
        }
      })(i13);

      return M.yldStarBH(M.yldStar(a), _36, _64);
    } else {
      fc8 = _38, fe8 = _43;
      return M.jumpH(_37, _43);
    }
  }

  function _36(a) {
    switch (a) {
      case 0:
        fc8 = _38, fe8 = _43;
        return M.jumpH(_37, _43);

      case 1:
        return M.jumpRH(_35, _64);

      default:
        return M.jumpRH(_35, _64);
    }
  }

  function _37() {
    if (loop8.exit) {
      loop8.exit();
    }

    return M.jumpH(fc8, fe8);
  }

  function _38() {
    k2 = 0;
    loop9 = M.iterator(a);
    return M.jumpH(_39, _65);
  }

  function _39() {
    var a;

    if (!(loop9 = loop9.step()).done) {
      i14 = loop9.value;

      a = (i => {
        var m, j9, loop, fc, fe, r, err;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          k2++;
          return M.yldStarBH(M.yld(`fo29: ${i} ${k2} ${m}`), _2, _7);
        }

        function _2() {
          loop = M.iterator(b);
          return M.jumpH(_3, _9);
        }

        function _3() {
          var a;

          if (!(loop = loop.step()).done) {
            j9 = loop.value;

            a = (j => {
              var n, _i, loop, fc, fe, r, err;

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
                    return M.jumpH(_3, _8);
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
                var a;

                if (!(loop = loop.step()).done) {
                  _i = loop.value;
                  a = _i();
                  return M.yldStarBH(M.yldStar(a), _3, _8);
                } else {
                  fc = _5, fe = _6;
                  return M.jumpH(_4, _6);
                }
              }

              function _4() {
                if (loop.exit) {
                  loop.exit();
                }

                return M.jumpH(fc, fe);
              }

              function _5() {
                return M.pure((br = `r: ${i} ${j} ${k2} ${m} ${n}`, 1));
              }

              function _6(e) {
                return M.raise(e);
              }

              function _7() {
                return M.raise(err);
              }

              function _8(a) {
                fc = _7, fe = _6, err = a;
                return M.jumpH(_4, _6);
              }
            })(j9);

            return M.yldStarBH(M.yldStar(a), _4, _9);
          } else {
            fc = _6, fe = _7;
            return M.jumpH(_5, _7);
          }
        }

        function _4(a) {
          switch (a) {
            case 1:
              fc = _6, fe = _7, r = 0;
              return M.jumpH(_5, _7);

            case 0:
              fc = _6, fe = _7, r = 1;
              return M.jumpH(_5, _7);

            case 2:
              return M.jumpRH(_3, _9);

            case 3:
              fc = _6, fe = _7;
              return M.jumpH(_5, _7);

            default:
              return M.jumpRH(_3, _9);
          }
        }

        function _5() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe);
        }

        function _6() {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8() {
          return M.raise(err);
        }

        function _9(a) {
          fc = _8, fe = _7, err = a;
          return M.jumpH(_5, _7);
        }
      })(i14);

      return M.yldStarBH(M.yldStar(a), _40, _65);
    } else {
      fc9 = _42, fe9 = _43;
      return M.jumpH(_41, _43);
    }
  }

  function _40(a) {
    switch (a) {
      case 0:
        fc9 = _42, fe9 = _43, r = br;
        return M.jumpH(_41, _43);

      case 1:
        return M.jumpRH(_39, _65);

      default:
        return M.jumpRH(_39, _65);
    }
  }

  function _41() {
    if (loop9.exit) {
      loop9.exit();
    }

    return M.jumpH(fc9, fe9);
  }

  function _42() {
    return M.pure(r);
  }

  function _43(e) {
    return M.raise(e);
  }

  function _44() {
    return M.raise(err);
  }

  function _45() {
    return M.raise(_err);
  }

  function _46() {
    return M.raise(err1);
  }

  function _47() {
    return M.raise(err2);
  }

  function _48() {
    return M.raise(err3);
  }

  function _49() {
    return M.raise(err4);
  }

  function _50() {
    return M.raise(err5);
  }

  function _51() {
    return M.raise(err6);
  }

  function _52() {
    return M.raise(err7);
  }

  function _53() {
    return M.raise(err8);
  }

  function _54() {
    return M.raise(err9);
  }

  function _55(a) {
    fc = _44, fe = _43, err = a;
    return M.jumpH(_3, _43);
  }

  function _56(a) {
    _fc = _45, _fe = _43, _err = a;
    return M.jumpH(_6, _43);
  }

  function _57(a) {
    fc1 = _46, fe1 = _43, err1 = a;
    return M.jumpH(_9, _43);
  }

  function _58(a) {
    fc2 = _47, fe2 = _43, err2 = a;
    return M.jumpH(_12, _43);
  }

  function _59(a) {
    fc3 = _48, fe3 = _43, err3 = a;
    return M.jumpH(_15, _43);
  }

  function _60(a) {
    fc4 = _49, fe4 = _43, err4 = a;
    return M.jumpH(_19, _43);
  }

  function _61(a) {
    fc5 = _50, fe5 = _43, err5 = a;
    return M.jumpH(_23, _43);
  }

  function _62(a) {
    fc6 = _51, fe6 = _43, err6 = a;
    return M.jumpH(_27, _43);
  }

  function _63(a) {
    fc7 = _52, fe7 = _43, err7 = a;
    return M.jumpH(_32, _43);
  }

  function _64(a) {
    fc8 = _53, fe8 = _43, err8 = a;
    return M.jumpH(_37, _43);
  }

  function _65(a) {
    fc9 = _54, fe9 = _43, err9 = a;
    return M.jumpH(_41, _43);
  }
}