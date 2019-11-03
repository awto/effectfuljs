let i = 0;
i++;
i++;
//
function func1() { (function func2() {
/*



*/
i++;
for(;i<6;) i++;
})()
}
i++;
func1();
