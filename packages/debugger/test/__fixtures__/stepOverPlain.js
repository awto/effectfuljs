let i = 0;
const j = 1;
function func1(m) {
  i += this.i + j + m;
}
function func2(j) {
  i += j;
  debugger;
  func1.apply({ i: j }, [30]);
}
func1.call({ i }, 10);
func2(15);
func1.call({ i: j }, 20);
console.log("I", i);
