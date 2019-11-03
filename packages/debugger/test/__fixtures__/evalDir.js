let i = 2;
global.i = 1;
global.obj = "there";
function dirEvalFunc(k) {
  return eval(`
debugger;
for(let j = 0; j < 4; j+=1) {
  console.log("I",j,k,i,this.obj);
  i++;
}
`);
}
dirEvalFunc(2);
dirEvalFunc.call({ obj: "hi" }, 1);
console.log(i,global.i);
