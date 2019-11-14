let i = 2;
global.i = 0;
eval(`
debugger;
for(let j = 0; j < 3; j++) {
  console.log("I",i);
  i++;
}
`);
debugger;
console.log(i);
