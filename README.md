sort
=======

sort for the browser and node.js


##example

```javascript
var sort = require("sort");


sort(
    [4, 0, 3, 5, 2, 1],
    function(a, b) {
        return a - b;
    },
    function(array) { // if callback is passed performs async sort
        console.log(array); // [0, 1, 2, 3, 4, 5]
    }
);
```
