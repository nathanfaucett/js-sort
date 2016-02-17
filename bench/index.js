var Benchmark = require("benchmark"),
    sort = require("..");


var suite = new Benchmark.Suite();


function randomSort() {
    return (Math.random() * 2) - 1;
}

function createArray(count) {
    var array = new Array(count);

    while (count--) {
        array[count] = count;
    }

    return array;
}
function createCharArray(count) {
    var array = new Array(count);

    while (count--) {
        array[count] = String.fromCharCode(count % 122);
    }

    return array;
}


suite.add("sort - int", (function() {
    var array = createArray(1000).sort(randomSort);
    return function() {
        sort(array);
    };
}()));
suite.add("Array.sort - int", (function() {
    var array = createArray(1000).sort(randomSort);
    return function() {
        array.sort();
    };
}()));

suite.add("sort - chars", (function() {
    var array = createCharArray(1000).sort(randomSort);
    return function() {
        sort(array);
    };
}()));
suite.add("Array.sort - chars", (function() {
    var array = createCharArray(1000).sort(randomSort);
    return function() {
        array.sort();
    };
}()));

suite.on("cycle", function(event) {
    console.log(String(event.target));
});

suite.on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
    console.log("==========================================\n");
});

console.log("\n= sort ===================================");
suite.run();
