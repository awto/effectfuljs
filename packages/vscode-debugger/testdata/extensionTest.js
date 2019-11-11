let i = 0;
function func1() {
  i++;
  func2();
}
function func2() {
  debugger;
  i *= 10;
}
func1();
console.log(i);
