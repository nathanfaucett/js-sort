quicksort
=======

quicksort for the browser and node.js


##example

```javascript
var quicksort = require("quicksort");


quicksort(
    [4, 0, 3, 5, 2, 1],
    function(a, b) {
        return a - b;
    },
    function(array) {
        console.log(array); // [0, 1, 2, 3, 4, 5]
    }
);
```
