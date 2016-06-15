function a1() {
    var i, j;
    if (true) {
        efft(i+=1);
    } else {
        effe(j+=2);
    }
}
function a2() {
    var i, j;
    eff(i);
    if (true) {
        efft(i+=1);
    } else {
        effe(j+=2);
    }
}

function a2a() {
    var i, j;
    eff(i);
    if (true) {
        efft(i+=1);
    } else {
        effe(j);
    }
}

function a2b() {
    var i, j;
    eff(i);
    if (true) {
        efft(i+=1);
    } else {
        j+=2;
    }
}

function a3() {
    var i, j;
    if (true) {
        efft(i+=1);
    } else {
        effe(j+=2);
    }
    console.log(i,j);
}

function a3a() {
    var i, j;
    if (true) {
        efft(i+=1);
    } else {
        effe(j+=2);
    }
    console.log(i,j);
}

function a3b() {
    var i, j;
    if (true) {
        efft(i+=1);
    } else {
        eff(j);
    }
    console.log(i,j);
}


function a3c() {
    var i, j;
    if (true) {
        efft(i+=1);
    } else {
        j+=2;
    }
    console.log(i,j);
}

function a4() {
    var i, j;
    eff(i);
    if (true) {
        efft(i+=1);
    } else {
        effe(j+=2);
    }
    console.log(i,j);
}

function a4a() {
    var i, j;
    eff(i);
    if (true) {
        efft(i+=1);
    } else {
        effe(j);
    }
    console.log(i,j);
}

function a4b() {
    var i, j;
    eff(i);
    if (true) {
        efft(i+=1);
    } else {
        j+=2;
    }
    console.log(i,j);
}

function a5() {
    var i, j;
    eff(i);
    if (true) {
        efft(i+=1);
    } else {
        effe(j+=2);
    }
    console.log(i,j);
    eff(i,j);
    eff(i,j);
}

function a6() {
    var i, j;
    eff(i);
    if (eff(i++)) {
        efft(i+=1);
    } else {
        effe(j+=2);
    }
    console.log(i,j);
    eff(i,j);
    eff(i,j);
}

function a7() {
    var i, j;
    eff(i);
    if (eff(i++)) {
        eff(j++);
        efft(i+=1);
    } else {
        effe(j+=2);
    }
    console.log(i,j);
    eff(i,j);
    eff(i,j);
}

function drawM() {
  var start = event("mousedown");
  console.log("s", start)
  if (!start)
    return def;
  var end = event("mouseup");
  console.log("e", end);
  var c = ".box"
  if (!end) {
    c = ".draw"
    end = event("mousemove")
    console.log("m", start, end)
  }
  console.log("s:", start)
  console.log("e:", end)
  return {s:start,e:end}
}
