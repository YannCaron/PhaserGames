var namespace = namespace || {
	CONST: 'my const',
};

namespace.Object1 = function (value) {
	this.attr1 = value;
};

namespace.Object1.prototype.getAttr1 = function () {
	return this.attr1;
}

var o1 = new namespace.Object1('attribute of object 1');
var o2 = new namespace.Object1('2');
console.log( o1.getAttr1() );