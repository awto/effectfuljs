(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (eff(i)) continue;
  }
});
(function() {
  console.log("bi");
  for(var i = 0; i < 3; i++) {
    console.log("bi:",i);
  }
  console.log("ai");
});

(function() {
  console.log("bi");
  lab: for(var i = 0; i < 3; i++) {
    console.log("bj:"+i);
    for(var j = 0; j < 40; j+=10) {
      if (j === 10)
        continue lab;
        if (j === 30)
          break lab;
        console.log(i + j);
    }
    console.log("aj:"+i);
  }
  console.log("ai");
});

function a() {
  eff('b');
  for(var i = 0; i < 3; i++) {
    if (i === 2)
      console.log(i); 
    eff(i);
  }
  eff('a');
};

function a1() {
  eff('b');
  for(var i = 0, j = 10; i < 3; i++, j+=2) {
    if (i === 2)
      console.log(i,j); 
    eff(i,j);
  }
  effRes(i,j);
};

function b() {
  eff('b');
  for(;;) {
    if (i === 2)
      console.log(i); 
    eff(i);
  }
  eff('a');
};

function c() {
  eff('b');
  for(;;) {
    if (i === 2)
      console.log(i);
    if (i === 3)
      return 10;
    eff(i);
  }
  eff('a');
};

