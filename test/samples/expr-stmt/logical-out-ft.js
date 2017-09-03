function a1() {
  return M.jB(eff(1), a1_1);
}

function a2() {
  return M.jB(eff(1), a2_1);
}

function a3() {
  return M.jB(eff(1), a3_1);
}

function a4() {
  return M.jB(eff(1), a4_1);
}

function a5() {
  var a;
  a = 1;
  return a ? a5_1(a) : M.j(eff(2), a5_1);
}

function a6() {
  return M.jB(eff(2), a6_1);
}

function a7() {
  var a;
  a = 1 + 1;
  return a ? a7_1(a) : M.j(eff(2), a7_1);
}

function a8() {
  return M.jB(eff(2), a8_1);
}

function a9() {
  var a;
  a = 1;
  return a ? M.j(eff(2), a9_1) : a9_1(a);
}

function a10() {
  return M.jB(eff(2), a10_1);
}

function a11() {
  var a;
  a = 1 + 1;
  return a ? M.j(eff(2), a11_1) : a11_1(a);
}

function a12() {
  return M.jB(eff(2), a12_1);
}

function a13() {
  return M.jB(eff(1), a13_1);
}

function a14() {
  return M.jB(eff(1), a14_1);
}

function a15() {
  return M.jB(eff(1), a15_1);
}

function a16() {
  return 1 ? M.j(eff(2), a16_1) : M.j(eff(3), a16_1);
}

function a17() {
  return M.jB(eff(1), a17_1);
}

function a18() {
  return M.jB(eff(1), a18_1);
}

function a19() {
  return M.jB(eff(1), a19_1);
}

function b() {
  return M.jB(eff(1), b_1);
}

function a1_1(a) {
  return a ? a1_2(a) : M.j(eff(2), a1_2);
}

function a1_2() {
  return M.pure();
}

function a2_1(a) {
  return a ? M.j(eff(2), a2_2) : a2_2(a);
}

function a2_2() {
  return M.pure();
}

function a3_1(a) {
  return a ? a3_2(a) : M.jB(eff(2), a3_2);
}

function a3_2(a) {
  return a ? a3_3(a) : M.j(eff(3), a3_3);
}

function a3_3() {
  return M.pure();
}

function a4_1(a) {
  return a ? M.jB(eff(2), a4_2) : a4_2(a);
}

function a4_2(a) {
  return a ? M.j(eff(3), a4_3) : a4_3(a);
}

function a4_3() {
  return M.pure();
}

function a5_1() {
  return M.pure();
}

function a6_1(a) {
  a ? a : 1;
  return M.pure();
}

function a7_1() {
  return M.pure();
}

function a8_1(a) {
  a ? a : 1 + 1;
  return M.pure();
}

function a9_1() {
  return M.pure();
}

function a10_1(a) {
  a ? 1 : a;
  return M.pure();
}

function a11_1() {
  return M.pure();
}

function a12_1(a) {
  a ? 1 + 1 : a;
  return M.pure();
}

function a13_1(a) {
  return a ? M.j(eff(2), a13_2) : M.j(eff(3), a13_2);
}

function a13_2() {
  return M.pure();
}

function a14_1(a) {
  return a ? a14_2(2) : M.j(eff(3), a14_2);
}

function a14_2() {
  return M.pure();
}

function a15_1(a) {
  return a ? M.j(eff(2), a15_2) : a15_2(3);
}

function a15_2() {
  return M.pure();
}

function a16_1() {
  return M.pure();
}

function a17_1(a) {
  console.log(a ? 2 : 3);
  return M.pure();
}

function a18_1(a) {
  return M.jB(eff(2), a18_2, a);
}

function a18_2(b, a) {
  a + b ? 2 : 3;
  return M.pure();
}

function a19_1(a) {
  return a ? a19_3(a) : M.j(eff(2), a19_2);
}

function a19_2() {
  return M.jB(eff(3), a19_3);
}

function a19_3(a) {
  return M.j(eff(a), a19_4);
}

function a19_4() {
  return M.pure();
}

function b_1(a) {
  return a ? b_2(a) : M.j(eff(2), b_2);
}

function b_2() {
  return M.jB(eff(1), b_3);
}

function b_3(a) {
  return a ? M.j(eff(2), b_4) : b_4(a);
}

function b_4() {
  var a;
  a = 1;
  return a ? b_5(a) : M.j(eff(2), b_5);
}

function b_5() {
  return M.jB(eff(2), b_6);
}

function b_6(a) {
  var b;
  a ? a : 1;
  b = 1 + 1;
  return b ? b_7(b) : M.j(eff(2), b_7);
}

function b_7() {
  return M.jB(eff(2), b_8);
}

function b_8(a) {
  var b;
  a ? a : 1 + 1;
  b = 1;
  return b ? M.j(eff(2), b_9) : b_9(b);
}

function b_9() {
  return M.jB(eff(2), b_10);
}

function b_10(a) {
  var b;
  a ? 1 : a;
  b = 1 + 1;
  return b ? M.j(eff(2), b_11) : b_11(b);
}

function b_11() {
  return M.jB(eff(2), b_12);
}

function b_12(a) {
  a ? 1 + 1 : a;
  return M.jB(eff(1), b_13);
}

function b_13(a) {
  return a ? M.j(eff(2), b_14) : M.j(eff(3), b_14);
}

function b_14() {
  return M.jB(eff(1), b_15);
}

function b_15(a) {
  return a ? b_16(2) : M.j(eff(3), b_16);
}

function b_16() {
  return M.jB(eff(1), b_17);
}

function b_17(a) {
  return a ? M.j(eff(2), b_18) : b_18(3);
}

function b_18() {
  return 1 ? M.j(eff(2), b_19) : M.j(eff(3), b_19);
}

function b_19() {
  return M.jB(eff(1), b_20);
}

function b_20(a) {
  a ? 2 : 3;
  return M.pure();
}