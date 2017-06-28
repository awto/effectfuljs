function a1_1(a) {
  return a ? M.pure(a) : eff(2);
}

function a2_1(a) {
  return a ? eff(2) : M.pure(a);
}

function a3_1(a) {
  return a ? a3_2(a) : M.jM(eff(2), a3_2);
}

function a3_2(a) {
  return a ? M.pure(a) : eff(3);
}

function a4_1(a) {
  return a ? M.jM(eff(2), a4_2) : a4_2(a);
}

function a4_2(a) {
  return a ? eff(3) : M.pure(a);
}

function a6_1(a) {
  a ? a : 1;
  return M.pure();
}

function a8_1(a) {
  a ? a : 1 + 1;
  return M.pure();
}

function a10_1(a) {
  a ? 1 : a;
  return M.pure();
}

function a12_1(a) {
  a ? 1 + 1 : a;
  return M.pure();
}

function a13_1(a) {
  return a ? eff(2) : eff(3);
}

function a14_1(a) {
  return a ? M.pure(2) : eff(3);
}

function a15_1(a) {
  return a ? eff(2) : M.pure(3);
}

function a17_1(a) {
  console.log(a ? 2 : 3);
  return M.pure();
}

function a18_1(a) {
  return M.jMB1(eff(2), a18_2, a);
}

function a18_2(b, a) {
  a + b ? 2 : 3;
  return M.pure();
}

function a19_1(a) {
  return a ? a19_3(a) : M.jM(eff(2), a19_2);
}

function a19_2() {
  return M.jM(eff(3), a19_3);
}

function a19_3(a) {
  return eff(a);
}

function b_1(a) {
  return a ? b_2(a) : M.jM(eff(2), b_2);
}

function b_2() {
  return M.jMB(eff(1), b_3);
}

function b_3(a) {
  return a ? M.jM(eff(2), b_4) : b_4(a);
}

function b_4() {
  return 1 ? b_5(f) : M.jM(eff(2), b_5);
}

function b_5() {
  return M.jMB(eff(2), b_6);
}

function b_6(a) {
  a ? a : 1;
  return 1 + 1 ? b_7(g) : M.jM(eff(2), b_7);
}

function b_7() {
  return M.jMB(eff(2), b_8);
}

function b_8(a) {
  a ? a : 1 + 1;
  return 1 ? M.jM(eff(2), b_9) : b_9(h);
}

function b_9() {
  return M.jMB(eff(2), b_10);
}

function b_10(a) {
  a ? 1 : a;
  return 1 + 1 ? M.jM(eff(2), b_11) : b_11(k);
}

function b_11() {
  return M.jMB(eff(2), b_12);
}

function b_12(a) {
  a ? 1 + 1 : a;
  return M.jMB(eff(1), b_13);
}

function b_13(a) {
  return a ? M.jM(eff(2), b_14) : M.jM(eff(3), b_14);
}

function b_14() {
  return M.jMB(eff(1), b_15);
}

function b_15(a) {
  return a ? b_16(2) : M.jM(eff(3), b_16);
}

function b_16() {
  return M.jMB(eff(1), b_17);
}

function b_17(a) {
  return a ? M.jM(eff(2), b_18) : b_18(3);
}

function b_18() {
  return 1 ? M.jM(eff(2), b_19) : M.jM(eff(3), b_19);
}

function b_19() {
  return M.jMB(eff(1), b_20);
}

function b_20(a) {
  a ? 2 : 3;
  return M.pure();
}

function a1() {
  return M.jMB(eff(1), a1_1);
}

function a2() {
  return M.jMB(eff(1), a2_1);
}

function a3() {
  return M.jMB(eff(1), a3_1);
}

function a4() {
  return M.jMB(eff(1), a4_1);
}

function a5() {
  return 1 ? M.pure(a) : eff(2);
}

function a6() {
  return M.jMB(eff(2), a6_1);
}

function a7() {
  return 1 + 1 ? M.pure(c) : eff(2);
}

function a8() {
  return M.jMB(eff(2), a8_1);
}

function a9() {
  return 1 ? eff(2) : M.pure(d);
}

function a10() {
  return M.jMB(eff(2), a10_1);
}

function a11() {
  return 1 + 1 ? eff(2) : M.pure(e);
}

function a12() {
  return M.jMB(eff(2), a12_1);
}

function a13() {
  return M.jMB(eff(1), a13_1);
}

function a14() {
  return M.jMB(eff(1), a14_1);
}

function a15() {
  return M.jMB(eff(1), a15_1);
}

function a16() {
  return 1 ? eff(2) : eff(3);
}

function a17() {
  return M.jMB(eff(1), a17_1);
}

function a18() {
  return M.jMB(eff(1), a18_1);
}

function a19() {
  return M.jMB(eff(1), a19_1);
}

function b() {
  return M.jMB(eff(1), b_1);
}