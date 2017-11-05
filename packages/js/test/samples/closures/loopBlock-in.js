
function a(p) {
  eff(1);
  let a = 0;
  for(let i of eff(2,a)) {
    eff(3,a,a)
    let j = i + 1, k = i + 1;
    i++;
    eff(function b(k) {
      eff(4, a, j, k++, p)
      {
        const k = 10;
        j++; a++; i++; k++, p++;
        eff(5, a, i, k, p);
      }
      eff(6, a, i, k, p);
    })
    eff(7, a, i, j);
  }
  eff(8, a, p);
}
