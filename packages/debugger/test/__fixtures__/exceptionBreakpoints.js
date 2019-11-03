function func1() {
  throw new Error("error");
}
function func2() {
  try {
    func1();
  } catch (e) {
    throw e;
  }
}
func2();
