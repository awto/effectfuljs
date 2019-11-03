"use strict";
let i = 2;
global.i = 1;
global.obj = "there";
global.k = 1;
function a(k) {
  return (0, eval)(`
debugger;
for(let j = 0; j < 4; j++) {
  console.log("I",j,i,k,this.obj);
  i++;
}
`);
}
a(3);
a.call({ obj: "hi" }, 2);
console.log(i,global.i);
