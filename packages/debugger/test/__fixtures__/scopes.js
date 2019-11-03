let i = "I1";
let k = "K1";
global.i = "GI";
global.j = "GJ";
global.k = "GK";
(function() {
  let j = "J1";
  {
    let i = "I2";
    eval(`let j = "J2";
          k += "+1";
          debugger;
          k += "-1";
          console.log(i, j, k, this);`);
  }
  (0, eval)(`let j = "J3";
             k += "+2";
             debugger;
             k += "-2";
             console.log(i, j);`);
  new Function(
    "j",
    `let i = "I3";
     k += "+3";
     debugger;
     k += "-3";
     console.log(i, j, k, this);`
  ).call(this, "JF");
  (function(k) {
    eval(`let j = "J4";
          debugger;
          console.log(i, j, k, this);`);
    (0, eval)(`let j = "J5";
               debugger;
               console.log(i, j, k)`);
  }.call(this, "KL"));
}.call({ obj: "OBJ" }));
