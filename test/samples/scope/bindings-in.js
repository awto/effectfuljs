function a1() {
  var i;
  eff1(i++);
}
function a2() {
  var i;
  eff2(eff1(i++));
}
function a3() {
  var i;
  eff1(i++);
  eff2(i);
  eff3(i++);
  eff4(i);
}
function a4() {
  var i;
  eff2(eff1(i++),i++);
}
function a5() {
  var i;
  eff2(eff1(i++),i++);
  eff(i);
}
function a6() {
  var i;
  eff2(i++,eff1(i+=2));
}
function a7() {
  var i;
  eff2(i++,eff1(i+=2));
  eff(i);
}
function a8() {
  var i;
  eff3(eff1(i++),eff2(i+=1));
}
function a9() {
  var i;
  eff2(eff1(i++),eff1(i+=1));
  eff(i);
}
function a10() {
  var i;
  eff2(eff1(i++),eff1(i+=1));
}
function a11() {
  var i;
  eff(eff(i++) + eff(2),i);
}
function a12() {
  var i;
  eff(eff(i++) + eff(2));
  console.log(i);
}
function a13() {
  var i;
  eff1(eff(i++),eff(i));
}
function a14() {
  var i;
  eff1(eff(i),eff(i++));
}
function a15() {
  var i;
  eff1(i,i++);
}
function a16() {
  var i;
  eff(i++, eff(i));
}

function a17() {
  var i;
  eff(i++, eff(i++));
}
function a18() {
  var i;
  eff(eff(i++), eff(i));
}
function a19() {
    var i;
    eff1(i+=1);
    eff2(i+=2);
}
function a20() {
  var i;
  eff1(i+=1,eff(i++));
  console.log(i);
}

function a21() {
  var i;
  eff1(i+=1,eff(i++));
  console.log(i);
}
function a22() {
  var i;
  eff1(i+=1,eff(i++));
  console.log(i);
  eff2(i+=2,eff(i));
}
function a23() {
  var i;
  eff1(i++,i+=1);
}
function a24() {
  var i;
  eff1(i++,i+=1);
  eff2(i++,i+=1);
  eff2(i++,i+=1);
}
function a25() {
  var i;
  eff1(i++,i+=1);
  console.log(i);
}
function a26() {
  var i;
  eff1(i++,i+=1);
  eff2(i++,i+=1);
  eff2(i++,i+=1);
  console.log(i);
}
function a27() {
  var i;
  eff1(i++);
  eff2(i++);
  eff2(i++);
}
function a28() {
  var i;
  eff(eff(i++));
  eff(i);
}
function a29() {
  var i;
  eff(eff(i++) + eff(2));
  i++;
  console.log(i);
}
function a30() {
  var i;
  eff(i++) + eff(2);
  console.log(i);
}
function a31() {
  var i;
  i = eff(i++) + eff(2);
  console.log(i);
}
function a32a() {
  var i;
  console.log(eff(i) + eff(2));
  console.log(i);
}
function a32() {
  var i;
  console.log(eff(i++) + eff(2));
  console.log(i);
}
function a33() {
  var i;
  i++;
  eff(i);
  eff(1);
  i = eff(i++) + eff(i++);
  i++;
  eff(i);
  eff(1);
}
function a33a() {
  var i;
  eff1(i);
  console.log(eff2(i+=1) + eff3(i+=2));
  eff4(i);
}
function a34() {
  var i;
  console.log(eff1(i+=1), eff(i+=2));
}
function a35() {
  var i;
  eff(i++).eff(i++);
}
function a36() {
  var i;
  eff(i++).eff(i++).eff(i++);
  eff(i);
}
function a37() {
    var i, j;
    eff(i);
    eff(i+=1,j+=1);
    eff(i);
}
function a38() {
    var i, j;
    eff(i);
    eff(i+=1);
    eff(i);
}
function a39() {
    var i, j;
    eff(i++,j++);
    eff(i++,j++);
    console.log(i,j);
};
function aij() {
    var i, j, y;
    i++;
    return M(eff(i)).mbind(function () {
        return function (i) {
            j = 2;
            i++;
            return M(eff(j)).mbind(function () {
                return M(eff(i, j)).mbind(function () {
                    return eff(j);
                });
            });
        }(i);
    });
}
