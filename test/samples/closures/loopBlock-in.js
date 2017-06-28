
function a() {
  eff(1);
  let a = 0;
  for(let i of eff(2,a)) {
    eff(3,a,a)
    let j = i + 1, k = i + 1;
    i++;
    (function b() {
      eff(4, a, j)
      j++; a++; i++;
      eff(4, a, i);
    })
    eff(5, a, i, j);
  }
  eff(6, a);
}


