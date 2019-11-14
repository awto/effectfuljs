var a = [];
a.push("line 1");
a.push("line 2");
a.push("line 3");
a.push("line 4");
a.push("line 5");
a.push("line 6");

var x = 0;

for (var i = 0; i < a.length; i++) {
	x = i*i;
	console.log(x);
}

process.exit();		// ensure that program terminates