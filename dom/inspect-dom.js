var nodeTypeMap = {
	1:	"ELEMENT_NODE",
	2:	"ATTRIBUTE_NODE",
	3:	"TEXT_NODE",
	4:	"CDATA_SECTION_NODE",
	5:  "ENTITY_REFERENCE_NODE",
	6:	"ENTITY_NODE",
	7:	"PROCESSING_INSTRUCTION_NODE",
	8:	"COMMENT_NODE",
	9:	"DOCUMENT_NODE",
	10:	"DOCUMENT_TYPE_NODE",
	11:	"DOCUMENT_FRAGMENT_NODE",
	12:	"NOTATION_NODE",
};

var sizeProperties = [
	"clientHeight",
	"clientLeft",
	"clientTop",
	"clientWidth",
	"offsetHeight",
	"offsetWidth",
	"offsetLeft",
	"offsetParent",
	"offsetTop",
	"scrollHeight",
	"scrollLeft",
	"scrollTop",
	"scrollWidth",
];

function getSizeProperties(node, includeZeroAndNullSizes) {
	if(typeof includeZeroAndNullSizes === "undefined") {
		includeZeroAndNullSizes = false;
	}

	var props = {};
	for(var x=0;x<sizeProperties.length;x++){
		var sizePropertyName = sizeProperties[x];

		var val = node[sizePropertyName];
		if(!includeZeroAndNullSizes && ((val === null) || (val === 0))) {
			continue;
		}

		props[sizePropertyName] = val;
	}
	return props;
}

// References: 
// https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
// https://developer.mozilla.org/en-US/docs/Web/API/Attr
function attributesDescription(elementNode) {
	
	attributeMap = {};

	var attrNamedNodeMap = elementNode.attributes;
	for(var x=0; x<attrNamedNodeMap.length;x++) {
		var attrNode = attrNamedNodeMap[x];
		var name = attrNode.name;
		var value = attrNode.value;
		attributeMap[name]=value;
	}
	return attributeMap;
}

function descriptiveNodeName(node) {
	var nodeType = nodeTypeMap[node.nodeType];
	var name = "";

	// TODO: which nodetypes (exactly) have "tagName"
	if(nodeType.indexOf("DOCUMENT_") != -1) {
		name += nodeType;
	} else {
		name += node.tagName;
	}
	if(nodeType === "ELEMENT_NODE") {
		if(node.hasAttribute("id")) {
			name += "#" + node.getAttribute("id");
		} else if(node.hasAttribute("class")) {
			name += "." + node.getAttribute("class");
		}
	}
	if(name === "undefined") {
		console.log(node);
		console.log("UNDEFINED");
	}
	return name;
}

// References : https://developer.mozilla.org/en-US/docs/Web/API/Node
function listChildren(node, skipTagsArray, depth, docPath) {
	// These are listed separately from the other attributes
	var specialAttributes = ["id", "class"];

	if(typeof depth === "undefined") {
		depth = 0;
		docPath = "";
	}
	if(typeof skipTagsArray === "undefined") {
		skipTagsArray = ["BR"];
	}

	var nodes = node.children;

	for(var x=0;x<nodes.length;x++) {
		var child = nodes[x];

		if(child.hasChildNodes()) {

			listChildren(child, skipTagsArray, depth + 1, docPath + ">" + descriptiveNodeName(node));
		} else {

			if(skipTagsArray.indexOf(child.tagName) != -1) {
				continue;
			}

			var desc = "";
			var separator = "\n";

			var childNodeType = nodeTypeMap[child.nodeType];
			if(childNodeType === "ELEMENT_NODE") {
				if(child.hasAttributes()) {
					var attrMap = attributesDescription(child);

					specialAttributes.forEach(function(specialAttr) {
						if(specialAttr in attrMap) {
							desc += specialAttr + ":" + attrMap[specialAttr] + separator;
							delete attrMap[specialAttr];
						}
					})

					if(Object.keys(attrMap).length) {
						desc += "Attributes: " + JSON.stringify(attrMap) + separator;
					}
				}
				var sizeMap = getSizeProperties(child);
				desc += "Sizes: " + JSON.stringify(sizeMap) + separator;
			} else {
				// Only non-element nodes have nodeValue;
				desc += "VALUE:" + child.nodeValue + separator;
			}

			desc += "Path:" + docPath + "(" + depth + ")" + separator;
			if(child.nodeName === child.tagName) {
				desc += "nodeName/tagName:" + child.nodeName + separator;
			} else {
				desc += "nodeName:" + child.nodeName + separator;
				desc += "tagName:" + child.nodeType + separator;
			}
			desc += "nodeType:" + childNodeType + separator;

			console.log(desc);
		}
	}
}
