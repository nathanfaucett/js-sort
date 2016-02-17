var now = require("now"),
    isFunction = require("is_function");


var TICK = (1000 / 60) * 0.001;


module.exports = sort;


function sort(array, sortFunction, callback) {
    var length = array.length,
        i;

    if (!isFunction(sortFunction)) {
        sortFunction = defalutSortFunction;
    }

    if (isFunction(callback)) {
        i = 0;
        return quicksortAsync(array, sortFunction, 0, length - 1, now(), function done() {
            i += 1;
            if (i === length) {
                callback(array);
            }
        });
    } else if (isFunction(array.sort)) {
        return array.sort(sortFunction);
    } else {
        return quicksort(array, sortFunction, 0, length - 1);
    }
}

function quicksort(array, sortFunction, start, end) {
    var index;

    if (start < end) {
        index = partition(array, sortFunction, start, end);
        quicksort(array, sortFunction, start, index - 1);
        quicksort(array, sortFunction, index + 1, end);
    }

    return array;
}

function quicksortAsync(array, sortFunction, start, end, ms, callback) {
    var sortedAreaLength = (end - start) + 1,
        index;

    if (sortedAreaLength > 1) {
        index = partition(array, sortFunction, start, end);

        if (now() - ms < TICK) {
            quicksortAsync(array, sortFunction, start, index - 1, ms, callback);
            quicksortAsync(array, sortFunction, index + 1, end, ms, callback);
        } else {
            process.nextTick(function onNextTick() {
                quicksortAsync(array, sortFunction, start, index - 1, now(), callback);
            });
            process.nextTick(function onNextTick() {
                quicksortAsync(array, sortFunction, index + 1, end, now(), callback);
            });
        }

        callback();
    } else if (sortedAreaLength === 1) {
        callback();
    }
}

function partition(array, sortFunction, start, end) {
    var indexEnd = end,
        indexStart = start,
        indexLength = indexEnd - 1,
        valueEnd = array[indexEnd],
        valueStart = array[indexStart];

    while (indexStart < indexEnd) {
        if (sortFunction(valueStart, valueEnd) < 0) {
            indexStart++;
        } else {
            arraySwap(array, indexStart, indexLength);
            arraySwap(array, indexLength, indexEnd);
            indexEnd--;
            indexLength--;
        }
        valueStart = array[indexStart];
        valueEnd = array[indexEnd];
    }

    return indexEnd;
}

function arraySwap(array, indexA, indexB) {
    var tmp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = tmp;
}

function defalutSortFunction(a, b) {
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else {
        return 1;
    }
}
