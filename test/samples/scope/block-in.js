function a() {
    var i, j;
    lab: {
        i++;
        eff(i);
        eff(i+=1,j+=1);
        lab2: {
            i+=3;
            eff(i);
            eff(i+=4);
            if (false)
                break lab;
        }
    }
    eff(i);
}

function a1() {
    var i, j;
    eff();
    lab: {
        i++;
        eff(i);
        eff(i+=1,j+=1);
        lab2: {
            i+=3;
            eff(i);
            eff(i+=4);
            if (false)
                break lab;
        }
    }
    eff(i);
}

function b() {
    var i, j;
    lab: {
        i++;
        eff(i);
        eff(i+=1,j+=1);
        lab2: {
            i+=3;
            eff(i);
            eff(i+=4);
            break lab;
        }
    }
    eff(i);
}
function c() {
    var i, j;
    lab: {
        i++;
        eff(i);
        eff(i+=1,j+=1);
        lab2: {
            i+=3;
            eff(i);
            eff(i+=6);
            break lab2;
            eff(i);
            eff(i++);
            break lab;
            eff(i);
            eff(i++);
        }
        return i+=5;
        eff(i);
        eff(i+=6);
    }
    eff(i);
    eff(i+=7);
}
function c0() {
    var i, j;
    lab: {
        eff(i);
        eff(i+=1,j+=1);
        eff(i);
        break lab;
    }
    eff(i);
}

function c1() {
    var i, j;
    lab: {
        i++;
        eff(i);
        eff(i+=1,j+=1);
        lab2: {
            i+=3;
            eff(i);
            eff(i+=6);
            if (true)
              break lab2;
            eff(i);
            eff(i++);
            if (true)
              break lab;
            eff(i);
            eff(i++);
        }
        return i+=5;
        eff(i);
        eff(i+=6);
    }
    eff(i);
    eff(i+=7);
}

function c2() {
    var i, j;
    eff();
    lab: {
        i++;
        eff(i);
        eff(i+=1,j+=1);
        lab2: {
            i+=3;
            eff(i);
            eff(i+=4);
            if (true)
              break lab2;
            eff(i);
            eff(i++);
            if (true)
              break lab;
            eff(i);
            eff(i++);
        }
        return i+=5;
        eff(i);
        eff(i+=6);
    }
    eff(i,j);
    eff(i+=7);
}

function d() {
    var i, j;
    eff(i++);
    if (t1)
      return i+=5;
    console.log(i);
}
