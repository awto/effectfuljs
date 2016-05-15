function a() {
    if (true)
        2;
    else
        3;
    return 1;
}
function b() {
    if (true) {
        console.log('a');
        console.log('b');
    } else {
        console.log('c');
        console.log('d');
    }
}