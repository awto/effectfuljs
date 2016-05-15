// *- SKIP

function a() {
    if (eff(1)) {
        console.log(eff(2) + eff(3));
    } else {        
        eff(4)(eff(eff(5)));
    }
}

function resa() {
    var tmp$1;
    eff(1).fmap(eff(2), eff(3), eff(4),
                eff(5).fmap(function(t) { tmp$1 = t; }),
                eff(dm$tmp$1),
                function(a$1, a$2, a$3, a$4, a$5, a$6) {
                    if (a$1) {
                        console.log(a$2 + a$3);
                    } else {
                        a$4(a$6);
                    }
                }
    );
}

/*
so embedded application doesn't look to have any sence at all

par levels:
  * always - will raise error if not capable
  * try - will do sequential if not capable
  * no - always sequential 

HOWEVER:
that function must return static thing anyway, the only problem
we cannot split that effectful and static thing from it without
inlining, or probably a kind of destination passing style?

*/


function pItem(n) {
    var cur = 0;
    for(var i = 0; i < n; i++) {
        cur += pInt();
        pWS();
    }
    return cur;
}

function pOther(n) {
    var res = pInt() + n;
    pWS();
}

function pSomegram() {
    var i = pInt(); // say number of next items
    pWS();
    var j = pItem(i); // the items
}

function pItemEff(n) {
    pInt().fmap(pWS(), function(i) { return i + n; });
}

function pSomegramEff() {
    var i, j;
    pInt().fmap(function(t1) { i = t1; })
          .fmap(pInt(), pWS(), function(t2) { j = i + t2; });
}

function pSomegram2() {
    var i = pInt(); // say number of next items
    pWS();
    var res = pInt() + i;
    pWS();
    var j = res;
}

function pSomegramEff() {
    var i, j, res;
    pInt().fmap(function(t1) { i = t1; })
        .fmap(pWS(), 
              pInt().fmap(function(t2) { res = t2 + i; }), 
              pWS())
        .fmap(function() { j = res; });
}

// what it would look like splitted?

function pSomegramEff() {
    var i, j, res;
    return pInt().fmap(pWS(), pInt(), pWS(),
                function(t1,t2,t3,t4) {
                    i = t1;
                    res = t3 + i;
                    j = res;
                });
    // so this an ide we split funcions into 2 parts
    // M.arr(pInt(), pWS(), pInt(), pWS())
    // and a pure function takin that as arguments
    // but that would probably can be the next step?
    // can we match resul type? (e.g. expect fmap)
    // no some parameter may be applied to the function's body
    // special combinator to call
    // M.call(pItem, p)
    // will check if there 
}

