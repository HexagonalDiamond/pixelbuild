//CLIENT -> SERVER
REQUEST_MAP = 0x01;

//SERVER -> CLIENT
SEND_MAP = 0x01;

//TILESET
tileset = {
	1: "wall",
	4: "floor"
}

LOAD_RADIUS = 1 // 1 outside what the player can see

// Width and height
WIDTH = 800
HEIGHT = 480

// Taken from: http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
// attach the .equals method to Array's prototype to call it on any array
array_equals = function (array1, array2) {
    // if the other array is a falsy value, return
    if (!array1)
        return false;

    // compare lengths - can save a lot of time
    if (array2.length != array1.length)
        return false;

    for (var i = 0, l=array2.length; i < l; i++) {
        // Check if we have nested arrays
        if (array2[i] instanceof Array && array1[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array2[i].equals(array1[i]))
                return false;
        }
        else if (array2[i] != array1[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}   
