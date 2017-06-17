function a01() {
  console.log("in");
  try {
    console.log("inner");
    eff("inner");
  } catch (e) {
    console.log("exception", e)
    eff("exception",e);
  }
  console.log("out");
  eff("out");
}

function a02() {
  console.log("in");
  try {
    eff("inner");
    console.log("inner");
  } catch (e) {
    eff("exception",e);
    console.log("exception", e)
  }
  eff("out");
  console.log("out");
}

function a03() {
  let i, j, ex
  console.log("in",i++, j+=2);
  eff(i++,j)
  try {
    eff("inner",i++,j);
    console.log("inner");
  } catch (e) {
    ex  = e;
    eff("exception",e,j++);
    console.log("exception", e)
  }
  eff("out",ex,i);
  console.log("out");
}


function a04() {
  var i = 0, j;
  eff(1,i++,j = 0);
  eff(2,i++,j = j + 1);
  l1: {
    eff(3,i,j)
    try {
      eff(4);
      l2: {
        try {
          eff(5,i);
          if (something) {
            break l2;
          } else if (something2) {
            break l1
          } else if (something3) {
            return;
          } else if (something4) {
            eff(6);
          }
          return;
        } finally {
          eff(7);
          try {
            try {
              if (something5)
                eff(8,j)
              else
                break l1;
            } finally {
              console.log("i");
            }
          } finally {
            eff(9,j = j + 1);
            eff(10);
            console.log(j);
          }
          eff(11);
          console.log(11);
        }
      }
      eff(12);
    } finally {
      eff(13,i = i + 1);
      eff(14);
    }
    eff(15,i)
  }
  eff(16); 
}



function a05() {
  eff(1);
  try {
    eff(2);
    eff(3);
  } finally {
    eff(4);
    eff(5);
  }
  eff(6);
}


function a06() {
  eff(1);
  try {
    eff(2);
    eff(3);
  } finally {
    eff(4);
    eff(5);
  }
  console.log(6);
}


function a07() {
  eff(1);
  loo: {
    try {
      eff(2);
      if (eff(3))
        break loo;
      eff(4);
    } finally {
      eff(5);
      eff(6);
    }
    eff(7);
  }
  console.log(8);
}

function a08() {
  eff(1);
  loo: {
    try {
      eff(2);
      if (eff(3))
        break loo;
      eff(4);
    } finally {
      eff(5);
      eff(6);
    }
    eff(7);
  }
  if (a)
    return 10;
  console.log(8);
}


function a09() {
  eff(1);
  loo: {
    try {
      eff(2);
      const a = eff(3);
      if (a === 1)
        break loo;
      if (a === 2)  {
        eff(4);
        return 10;
      }
      try {
        eff(5);
        const a = eff(6);
        if (a === 1)
          break loo;
        if (a === 2)  {
          return 10;
        }
        eff(7);
      } finally {
        eff(8);
        eff(9);
      }
      eff(10);
    } finally {
      eff(11);
      eff(12);
    }
    eff(13);
  }
  return eff(14);
}


function a10() {
  try {
    eff(2);
    try {
      eff(5);
      const a = eff(6);
      if (a)
        return eff(3);
    } finally {
      eff(8);
      eff(9);
    }
  } finally {
    eff(11);
    eff(12);
  }
  eff(13);
}

function a11() {
  try {
    try {
      eff(1);
    } finally {
      eff(2);
    }
    eff("a");
  } finally {
    eff(3);
  }
  eff(4);
}

function a12() {
  try {
    try {
      if(eff(1))
        return 10;
    } finally {
      eff(2);
    }
    eff("A");
  } finally {
    eff(3);
  }
  eff(4);
}

function a13() {
  loo: {
    try {
      try {
        if (eff(1))
          break loo;
      } finally {
        eff(2);
        eff("2");
      }
      eff("A");
    } finally {
      eff(3);
    }
    eff(4);
  }
}

function a14() {
  try {
    for(;;) {
      try {
        const a = eff(1);
        if (a === 1)
          break;
        else if (a === 2)
          continue;
        else if (a === 3)
          return 1;
        else if (a === 4)
          return;
        else if (a === 5)
          return eff("REZ");
        eff(2)
      } finally {
        eff(3);
        eff(4);
      }
      eff(5);
    }
  } finally {
    eff(6);
    eff(7);
  }
  eff(8);
}

function a15() {
  for(;;) {
    console.log("a");
    for(;;) {
      const a = eff(1);
      if (a === 1)
        break;
      eff(2);
    }
    if (a)
      break
  }
  eff(8);
}

function a15a() {
  if (a === 1)
    return;
  eff(2);
}

function a16() {
  eff(0);
  for(;;) {
    console.log("a");
    for(;;) {
      const a = eff(1);
      if (a === 1)
        break;
      eff(2);
    }
    if (a)
      break
  }
  eff(8);
}

function a17() {
  for(;;) {
    for(;;) {
      const a = eff(1);
      if (a === 1)
        break;
      eff(2);
    }
    if (b)
      break
  }
  eff(8);
}

function a18() {
  for(;;) {
    for(;;) {
      try {
        const a = eff(1);
        if (a === 1)
          break;
        eff(2);
      } finally {
        effF(3)
        effF(4)
      }
    }
    if (b)
      break
  }
  eff(8);
}

function a19() {
  for(;;) {
    eff(1);
    try {
      eff(2);
    } finally {
      effF(3);
    }
  }
}

function a20() {
  for(;;) {
    try {
      eff(2);
    } finally {
      effF(3);
    }
  }
}

function a21() {
  for(;;) {
    try {
      eff(2);
    } finally {
      try {
        if (a1)
          continue
        if (a2)
          break
        if (a3)
          return
        effF(3)
      } finally {
        effFF(4);
      }
    }
  }
}

function a22() {
  for(;;) {
    try {
      eff(2);
    } finally {
      effFF(4);
    }
  }
}

function a23() {
  try {
    for(;;) {
      try {
        if (a1)
          break;
        eff(2);
      } finally {
        effFF(4);
      }
    }
  } finally {
    effFF(5);
  }
  eff(6);
}



function a24() {
  try {
    for(;;) {
      try {
        if (a1)
          break;
        eff(2);
      } finally {
        effFF(4);
      }
    }
  } finally {
  }
  eff(6);
}

function a25() {
  for(;;) {
    try {
      if (a1)
        break;
      eff(2);
    } finally {
      try {
        break
      } finally {
        effFF(4);
      }
    }
  }
}

function a26() {
  for(;;) {
    try {
      if (a1)
        break;
      eff(2);
    } finally {
      try {
        break
      } finally {
        effFF(4);
      }
    }
  }
}

function a27() {
  for(;;) {
    try {
      if (a1)
        break;
      eff(2);
    } finally {
      try {
        break
      } finally {
        effFF(4);
      }
    }
  }
  eff(5);
}


function a28() {
  l1: {
    try {
      l2: {
        try {
          if (a1)
            break l1;
          eff(2);
        } finally {
          eff(3)
          try {
            if (a2)
              break l2;
            eff(4);
          } finally {
            eff(5);
          }
        }
      }
      eff(6)
    } finally {
      eff(7)
    }
  }
  eff(8);
}


function a29() {
  l1: {
    try {
      l2: {
        try {
          break l1;
          eff(2);
        } finally {
          eff(3)
          try {
            break l2;
            eff(4);
          } finally {
            eff(5);
          }
        }
      }
      eff(6)
    } finally {
      eff(7)
    }
  }
  eff(8);
}

function a30(a1,a2) {
  l1: {
    try {
      l2: {
        try {
          if (a1)
            break l1;
          eff(2);
        } finally {
          eff(3)
          try {
            if (a2)
              break l2;
            eff(4);
          } finally {
            eff(5);
          }
        }
      }
      eff(6)
    } finally {
      eff(7)
    }
  }
  eff(8);
}


function a31() {
  try {
    console.log("hi");
    eff(1);
    eff(2);
  } catch(e) {
    console.log(e);
    eff(3);
  }
  eff(4);
}

function a32(a1,a2) {
  try {
    try {
      console.log("hi");
      eff(1);
      eff(2);
    } catch(e) {
      console.log(e);
      eff(3);
    }
  } catch(ee) {
    eff(4)
  }
  eff(5);
}

function a33() {
  try {
    console.log("hi");
    eff(1);
    eff(2);
  } catch(e) {
    console.log(e);
    eff(3);
  } finally {
    eff(4)
  } 
  eff(5);
}

function a34() {
  try {
    try {
      console.log("hi");
      eff(1);
    } finally {
      eff(2);
    }
    eff(3);
  } catch(e) {
    eff(e);
  } finally {
    eff(4)
  } 
  eff(5);
}

function a35() {
  try {
    try {
      console.log("hi");
      eff("try>try>body");
    } finally {
      eff("try>try>finally");
    }
    eff("try>body");
  } catch(e) {
    console.log(e);
    eff("try>catch");
  } 
  eff("last");
}

function a36(a1) {
  try {
    if (a1)
      return;
    eff("body");
  } finally {
    eff("finally");
  }
}


function a37(a1,a2) {
  l1: {
    try {
      l2: {
        try {
          if (a1)
            break l1;
          eff("l1>try-body>l2>try-body");
        } finally {
          eff("l1>try-body>l2>try-finally");
          try {
            if (a2)
              break l2;
            eff("l1>try-body>l2>try-finally>try-body");
          } finally {
            eff("l1>try-body>l2>try-finally>try-finally");
          }
        }
      }
      eff("l1>try-body");
    } finally {
      eff("l1>try-finally");
    }
  }
  eff("end");
}

function a38(a1) {
  var i = 0, j = 0
  eff("pref",i,j);
  try {
    i+=1, j += 2;
    if (i > 10)
      return 10;
    eff("body",i,j);
  } finally {
    eff("finally",i);
  }
}

function a39(a1) {
  var i = 0, j = 0
  eff("pref",i,j);
  try {
    i+=1, j += 2;
    if (i > 10)
      return 10;
    eff("body",i,j);
  } finally {
    eff("finally",i);
  }
  eff("exit",j);
}



function a40(a1) {
  var i = 0, j = 0
  eff("pref",i,j);
  try {
    l1: {
      eff("l1", i, j++);
      try {
        i+=1;
        if (i > 10)
          return 10;
        if (j > 10)
          break l1;
        eff("l1 > body",i,j);
      } finally {
        eff("l1 > finally",i);
      }
      eff("l1 > exit", j)
    }
  } finally {
    eff("body > finally",i)
  }
  eff("exit",j);
}

function a41(a1) {
  if (a1 === 1)
    return 10;
  else if (a1 === 2)
    return eff(11);
  else if (a1 === 3) {
    eff(12);
    return;
  }
  eff("exit");
}

function a42(a1) {
  try {
    if (a1 === 1)
      return 10;
    else if (a1 === 2)
      return eff(11);
    else if (a1 === 3) {
      eff(12);
      return;
    }
  } finally {
    eff("finally")
  }
  eff("exit");
}


function a43(a1) {
  var i = 0, j = 0
  eff("pref",i,j);
  try {
    l1: {
      eff("l1", i, j++);
      try {
        i+=1;
        if (i > 10)
          return 10;
        if (j > 10)
          break l1;
        eff("l1 > body",i,j);
      } finally {
        eff("l1 > finally",i);
      }
      eff("l1 > exit", j)
    }
  } finally {
    eff("body > finally",i)
  }
  eff("exit",j);
}
