import * as M2 from "./mod2";

let j = 0;

function run(i = 1) {
  j += i;
  M2.f2(M2.f1(i++), i);
  j += i;
  console.log(`i:${i},j:${j}`);
}

run();
run();
