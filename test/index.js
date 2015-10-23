var tape = require("tape"),
    quicksort = require("..");


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

tape("quicksort(array: Array, sortFunction: Function)", function(assert) {
    var array = createArray(100000).sort(randomSort);
    assert.deepEqual(quicksort(array, sort), createArray(100000), "should perform blocking quicksort");
    assert.end();
});

tape("quicksort(array: Array, sortFunction: Function, callback: Function)", function(assert) {
    var array = createArray(100000).sort(randomSort);

    quicksort(array, sort, function(array) {
        assert.deepEqual(array, createArray(100000), "should perform non blocking quicksort");
        assert.end();
    });
});
