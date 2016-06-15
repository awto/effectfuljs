
function a() {
    var i, j, k;
    eff(k);
    k++;
    try {
        eff(i);
        i++;
        k++;
        j = i;
        eff(i,j,k);
        eff(i,j);
    } catch(e) {
        console.log(i,j,e);
    }
    eff(k+=1);
    console.log(k);
}


function b() {
    var i, j, k;
    eff(k);
    k++;
    try {
        eff(i);
        i++;
        j = i;
        eff(i,j);
    } catch(e) {
        console.log(i,j,e);
    }
    eff(k+=1);
    console.log(k);
}
