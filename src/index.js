var time = require("time"),
    isFunction = require("is_function");


var TICK = (1000 / 60) * 0.001;


module.exports = quicksort;


function quicksort(array, sortFunction, callback) {
    var i, length;

    if (isFunction(callback)) {
        i = 0;
        length = array.length;
        return quicksortAsync(array, sortFunction, 0, length - 1, time.now(), function done() {
            i += 1;
            if (i === length) {
                callback(array);
            }
        });
    } else {
        return array.sort(sortFunction);
    }
}

function quicksortAsync(array, sortFunction, start, end, ms, callback) {
    var sortedAreaLength = (end - start) + 1,
        index;

    if (sortedAreaLength > 1) {
        index = partition(array, sortFunction, start, end);

        if (time.now() - ms < TICK) {
            quicksortAsync(array, sortFunction, start, index - 1, ms, callback);
            quicksortAsync(array, sortFunction, index + 1, end, ms, callback);
        } else {
            process.nextTick(function onNextTick() {
                quicksortAsync(array, sortFunction, start, index - 1, time.now(), callback);
            });
            process.nextTick(function onNextTick() {
                quicksortAsync(array, sortFunction, index + 1, end, time.now(), callback);
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
