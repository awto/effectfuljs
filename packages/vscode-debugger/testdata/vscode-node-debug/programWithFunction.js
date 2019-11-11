
// global function
foo = function(n) {
	return n;
}

bar = function(n) {
	return n;
}

console.log('foo defined');

setInterval(function() {
	foo(123);
}, 300);

setInterval(function() {
	bar(123);
}, 300);