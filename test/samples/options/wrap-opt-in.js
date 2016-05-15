// *- SKIP 
M.option("cond(name === 'eff',{coerce:'none'})");
function n1() {
    eff(1);
    eff(2);
}
function n2() {
    eff(1);
    eff(2);
    eff(3);
}
function n2() {
    eff(1), eff(2);
    eff(3);
}

M.option("cond(name === 'eff',{coerce:'value'})");
function v1() {
    eff(1);
    eff(2);
}

function v2() {
    eff(1);
    eff(2);
    eff(3);
}

function v3() {
    eff(1), eff(2);
    eff(3);
}

M.option("cond(name === 'eff',{coerce:'all'})");
function t1() {
    eff(1);
    eff(1);
}

function t2() {
    eff(1);
    eff(2);
    eff(3);
}

function t3() {
    eff(1), eff(2);
    eff(3);
}



