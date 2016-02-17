var tape = require("tape"),
    sort = require("..");


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
        array[count] = String.fromCharCode(count);
    }

    return array;
}

tape("sort(array: Array, sortFunction: Function) Integers", function(assert) {
    var array = createArray(1000).sort(randomSort);
    assert.deepEqual(sort(array, null), createArray(1000), "should perform blocking sort on Integers");
    assert.end();
});
tape("sort(array: Array, sortFunction: Function, callback: Function) Integers", function(assert) {
    var array = createArray(1000).sort(randomSort);

    sort(array, null, function(array) {
        assert.deepEqual(array, createArray(1000), "should perform non blocking sort on Integers");
        assert.end();
    });
});

tape("sort(array: Array, sortFunction: Function) Characters", function(assert) {
    var array = createCharArray(255).sort(randomSort);
    assert.deepEqual(sort(array, null), createCharArray(255), "should perform blocking sort on Characters");
    assert.end();
});
tape("sort(array: Array, sortFunction: Function, callback: Function) Characters", function(assert) {
    var array = createCharArray(255).sort(randomSort);

    sort(array, null, function(array) {
        assert.deepEqual(array, createCharArray(255), "should perform non blocking sort on Characters");
        assert.end();
    });
});
