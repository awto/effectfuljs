let i = 100,
  j = 20;
function func1(j) {
  let k = i++;
  func2.call({ j, i }, k);

  function func2(m) {
    i += (m => this.j + m)(k);
    i *= 10 + this.i + m;
  }
}
func1(3000);
console.log("I", i);
debugger;
