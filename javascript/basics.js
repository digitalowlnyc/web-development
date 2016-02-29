/**
 * Some very basic stuff that is missing in some JS implementations
 * Objects:
 * -size
 * -keys
 * -values
 * Strings:
 * -contains
 */

var BASICS = function() {
}

BASICS.objectSize = function(obj) {
	var size = 0
    for(prop in obj) {
    	if(obj.hasOwnProperty(prop)) {
    		size++;
    	}
    }
    return size;
};

BASICS.objectKeys = function(obj) {
	var keys = [];
	for(var key in obj) {
		if(Object.prototype.hasOwnProperty.call(obj, key)) {
			keys.push(key);
		}
	}
	return keys;
}

BASICS.objectValues = function(obj) {
	var values = [];
	for(var key in obj) {
		if(Object.prototype.hasOwnProperty.call(obj, key)) {
			values.push(obj[key]);
		}
	}
	return values;
}

BASICS.stringContains = function(string, searchString) {
	if(string === null) {
		return false;
	}
    return(string.indexOf(searchString) != -1);
}