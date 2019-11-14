console.log("line 1");
console.log("line 2");
console.log("line 3");

try {
	throw new Error("error");
} catch(e) {
	console.log("exception: " + e);
}

console.log("line 4");
console.foobar("line 5");
console.log("line 6");
