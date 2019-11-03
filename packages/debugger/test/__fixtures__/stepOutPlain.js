let i = 0;
function func0() {
  i++;
}
function func1() {
  func0();
  debugger;
  func0();
}

function func2() {
  func1();
  func1();
}

function func3() {
  (function sub() {
    func2();
  })();
  func1();
  func0();
}

func3();
console.log("I", i);
