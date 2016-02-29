/**
 * Some very basic stuff that is missing in some JS implementations
 * Objects:
 * -size
 * -keys
 * -values
 * Strings:
 * -contains
 * Arguments:
 * -Default values
 */

var BASICS = function() {
}

BASICS.get = function(obj, prop, defaultValue) {
	if(obj === null) {
		throw "Cannot get property from null object";
	}
	if(prop === null) {
		throw "Cannot get 'null' property from object";
	}
	if(!(prop in obj)) {
		if(typeof defaultValue !== "undefined") {
			return defaultValue;
		}
		throw "Object " + obj + " does not contain property prop";
	}
	return obj[prop];
};

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

BASICS.argDefault = function(arg, defaultValue) {
	if(typeof arg === "undefined") {
		return defaultValue;
	}
	return arg;
}