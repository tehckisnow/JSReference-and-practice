var dumbGlobalVariable = 0;

function increaseGlobal() {
	dumbGlobalVariable++;
	return "global = " + dumbGlobalVariable;
}
//the global variable increases each time; this is the expectd behavior.
console.log(increaseGlobal());
console.log(increaseGlobal());
console.log(increaseGlobal());
//now make the counter variable private with a closure;
function example1() {
	var pfleug = 0;
	function thisIsAClosure() {
		pfleug++;
		return "pfleug = " + pfleug;
	}
	return thisIsAClosure;
};
//these three all return "[function: thisIsAClosure]" -sad!
console.log(example1());
console.log(example1());
console.log(example1());
//make example() a self-invoking function
var example2 = (function () {
	var pfleug = 0;
	function thisIsAClosure() {
		pfleug++;
		return "pfleug = " + pfleug;
	}
	return thisIsAClosure;
})();
//correct behavior!
console.log(example2());
console.log(example2());
console.log(example2());

//cannot call pfleug; it is private
//pfleug++;
//but dumbGlobalVariable still can. sad!
dumbGlobalVariable++;

//example() needs to run once in order to create pfleug and call 
//thisIsAClosure() before it will reassign the function definition.
//This is why it must be self-invoking (as in example2()).

/*
Output:
global = 1
global = 2
global = 3
[Function: thisIsAClosure]
[Function: thisIsAClosure]
[Function: thisIsAClosure]
pfleug = 1
pfleug = 2
pfleug = 3
*/