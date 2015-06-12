var assert = require("assert"),
    quicksort = require("../src/index");


function sort(a, b) {
    return a - b;
}

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


describe("quicksort", function() {
    describe("#(array: Array, sortFunction: Function)", function() {
        it("should perform blocking quicksort", function() {
            var array = createArray(100000).sort(randomSort);
            assert.deepEqual(quicksort(array, sort), createArray(100000));
        });
    });

    describe("#(array: Array, sortFunction: Function, callback: Function)", function() {
        it("should perform non blocking quicksort", function(done) {
            var array = createArray(100000).sort(randomSort);

            quicksort(array, sort, function(array) {
                assert.deepEqual(array, createArray(100000));
                done();
            });
        });
    });
});
