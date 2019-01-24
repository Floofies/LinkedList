const LinkedList = require("../src/LinkedList.js");
const DoubleLinkedList = require("../src/DoubleLinkedList.js");
const CircularLinkedList = require("../src/CircularLinkedList.js");
const CircularDoubleLinkedList = require("../src/CircularDoubleLinkedList.js");
function isListElement(element) {
	return ((typeof element) === "object") && (element instanceof LinkedList.ListElement);
}
// Simple LinkedList iterator which enumerates all ListElements.
function* listIterator(list) {
	var curElement = list.head;
	var nextElement;
	while (curElement !== null && list.size > 0) {
		nextElement = curElement.next;
		yield curElement;
		curElement = nextElement;
	}
}
// Tests a LinkedList's ListElements by quantity.
function countElements(list, quantity) {
	var loc = 1;
	for (const element of listIterator(list)) {
		expect(isListElement(element)).toBe(true);
		expect(element.parent).toBe(list);
		if (loc === quantity) return;
		if (element === list.tail) return;
		loc++;
	}
}
// Tests a LinkedList's non-head/tail ListElements by value & quantity.
function countValues(list, quantity) {
	var loc = 1;
	for (const element of listIterator(list)) {
		expect(isListElement(element)).toBe(true);
		expect(element.parent).toBe(list);
		if (element !== list.head && element !== list.tail) {
			expect(element.payload).toBe(loc);
			if (loc === quantity) return;
			loc++;
		}
		if (element === list.tail) return;
	}
}
function testLength(obj) {
	if (Array.isArray(obj)) {
		return obj.length;
	}
	if (obj !== null && typeof obj === "object") {
		return Object.keys(obj).length;
	}
	throw new TypeError("The given parameter must be an Object or Array");
}

function testDiff(subject, compare, search = null) {
	const noIndex = search === null;
	if (noIndex && testLength(subject) !== testLength(compare)) return true;
	if (noIndex) search = subject;
	const tuple = { subject, search, compare };
	const map = new Map();
	map.set(search, tuple);
	if (testDiff.test(tuple, map, noIndex)) return true;
	return false;
}

// Checks for which "newer" RegExp properties are supported.
const supportedRegExpProps = {
	sticky: "sticky" in RegExp.prototype,
	unicode: "unicode" in RegExp.prototype,
	flags: "flags" in RegExp.prototype
};

testDiff.test = function (tuple, map, noIndex) {
	for (const accessor in tuple.search) {
		if (!(accessor in tuple.subject)) continue;
		if (!("compare" in tuple) && !(typeof tuple.compare !== "object") || !(accessor in tuple.compare)) {
			return true;
		}
		const subjectProp = tuple.subject[accessor];
		const compareProp = tuple.compare[accessor];
		const searchProp = tuple.search[accessor];
		if ((Array.isArray(subjectProp) && Array.isArray(compareProp))
			|| ((typeof subjectProp === "object" && typeof compareProp === "object")
				&& (subjectProp !== null && compareProp !== null))) {
			if (subjectProp instanceof RegExp && compareProp instanceof RegExp) {
				if (
					subjectProp.source !== compareProp.source
					|| subjectProp.ignoreCase !== compareProp.ignoreCase
					|| subjectProp.global !== compareProp.global
					|| subjectProp.multiline !== compareProp.multiline
					|| (supportedRegExpProps.sticky && subjectProp.sticky !== compareProp.sticky)
					|| (supportedRegExpProps.unicode && subjectProp.unicode !== compareProp.unicode)
					|| (supportedRegExpProps.flags && subjectProp.flags !== compareProp.flags)
				) {
					return true;
				}
			} else if (noIndex && testLength(subjectProp) !== testLength(compareProp)) {
				return true;
			}
			if (map.has(searchProp)) continue;
			// Node has not been seen before, so traverse it
			const nextTuple = {};
			// Travese the Tuple's properties
			for (const unit in tuple) {
				if (
					(
						unit === "search"
						|| unit === "subject"
						|| (Array.isArray(tuple[unit][accessor]) || typeof tuple[unit][accessor] === "object")
					)
					&& accessor in tuple[unit]
				) {
					nextTuple[unit] = tuple[unit][accessor];
				}
			}
			map.set(searchProp, nextTuple);
			if (testDiff.test(nextTuple, map, noIndex)) return true;
		} else {
			if (Number.isNaN(subjectProp) !== Number.isNaN(compareProp)) return true;
			if (subjectProp !== compareProp) return true;
		}
	}
}

describe("testLength", function () {
	var array = [1, 2, 3, 4, 5];
	var object = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
	it("should count 5 items in each container", function () {
		expect(testLength(array)).toBe(5);
		expect(testLength(object)).toBe(5);
	});
});
const testObjects = {};
testObjects["Linear Acyclic"] = () => ["one", "two", "three"];
// Fourth element is a cycle
testObjects["Linear Cyclic"] = () => {
	const obj = ["one", "two", "three"];
	obj[3] = obj;
	return obj;
};
// Nested Arrays
testObjects["Nested Acyclic"] = () => ["one", "two", [
	"three", "four", [
		"five", "six"
	]
]];
testObjects["Nested Cyclic"] = () => {
	const obj = ["one", "two", [
		"three", "four", [
			"five", "six"
		]
	]];
	obj[2].push(obj[2][2]);
	return obj;
};
describe("testDiff", function () {
	it("should return true when two objects differ", function () {
		expect(testDiff(testObjects["Linear Acyclic"](), testObjects["Linear Cyclic"]())).toBe(true);
		expect(testDiff(testObjects["Linear Cyclic"](), testObjects["Nested Acyclic"]())).toBe(true);
		expect(testDiff(testObjects["Nested Cyclic"](), testObjects["Nested Acyclic"]())).toBe(true);
	});
	it("should return false when two objects are the same", function () {
		expect(testDiff(testObjects["Linear Acyclic"](), testObjects["Linear Acyclic"]())).toBe(false);
		expect(testDiff(testObjects["Linear Cyclic"](), testObjects["Linear Cyclic"]())).toBe(false);
		expect(testDiff(testObjects["Nested Cyclic"](), testObjects["Nested Cyclic"]())).toBe(false);
		expect(testDiff(testObjects["Nested Acyclic"](), testObjects["Nested Acyclic"]())).toBe(false);
	});
});
// Tests for LinkedList
function llTests(List) {
	it("should contain elements added via insertAfter", function () {
		const list = new List();
		var element = list.insertAfter(list.head, 1);
		element = list.insertAfter(element, 2);
		element = list.insertAfter(element, 3);
		element = list.insertAfter(element, 4);
		list.insertAfter(element, 5);
		countValues(list, 5);
	});
	it("should contain elements added via insertBefore", function () {
		const list = new List();
		var element = list.insertBefore(list.tail, 5);
		element = list.insertBefore(element, 4);
		element = list.insertBefore(element, 3);
		element = list.insertBefore(element, 2);
		list.insertBefore(element, 1);
		countValues(list, 5);
	});
	it("should contain elements added from an iterable", function () {
		const list = new List([1,2,3,4,5]);
		const one = list.head.next;
		expect(isListElement(one) && one.payload === 1).toBe(true);
		const two = one.next;
		expect(isListElement(two) && two.payload === 2).toBe(true);
		const three = two.next;
		expect(isListElement(three) && three.payload === 3).toBe(true);
		const four = three.next;
		expect(isListElement(four) && four.payload === 4).toBe(true);
		const five = four.next;
		expect(isListElement(five) && five.payload === 5).toBe(true);
	});
	it ("should enumerate ListElements via elements/Symbol.iterator", function () {
		const list = new List([1,2,3,4,5]);
		var loc = 1;
		for (const element of list) {
			expect(isListElement(element)).toBe(true);
			expect(element.parent).toBe(list);
			expect(element.payload).toBe(loc);
			loc++
		}
	});
	it ("should enumerate ListElement values via values", function () {
		const list = new List([1,2,3,4,5]);
		var loc = 1;
		for (const value of list.values()) {
			expect(value).toBe(loc);
			loc++
		}
	});
	it ("should enumerate ListElements via elements", function () {
		const list = new List([1,2,3,4,5]);
		var loc = 1;
		for (const element of list.elements()) {
			expect(isListElement(element)).toBe(true);
			expect(element.parent).toBe(list);
			expect(element.payload).toBe(loc);
			loc++
		}
	});
	it ("should enumerate ListElement values via forEach", function () {
		const list = new List([1,2,3,4,5]);
		var loc = 1;
		list.forEach(function (value, index) {
			expect(value).toBe(loc);
			expect(index).toBe(loc - 1);
			loc++;
		});
	});
	it("should search for an index via item", function () {
		const list = new List([1,2,3,4,5]);
		expect(list.item(0).payload).toBe(1);
		expect(list.item(1).payload).toBe(2);
		expect(list.item(2).payload).toBe(3);
		expect(list.item(3).payload).toBe(4);
		expect(list.item(4).payload).toBe(5);
	});
	it("should maintain a count of elements via size", function () {
		const list = new List([1,2,3,4,5]);
		expect(list.size).toBe(5);
		list.pop();
		expect(list.size).toBe(4);
		list.pop();
		expect(list.size).toBe(3);
		list.pop();
		expect(list.size).toBe(2);
		list.pop();
		expect(list.size).toBe(1);
		list.pop();
		expect(list.size).toBe(0);
	});
	it("should contain elements added via push/append", function () {
		const list = new List();
		list.push(1);
		list.push(2);
		list.push(3);
		list.push(4);
		list.push(5);
		countElements(list, 5);
	});
	it("should contain elements added via unshift/prepend", function () {
		const list = new List();
		list.unshift(5);
		list.unshift(4);
		list.unshift(3);
		list.unshift(2);
		list.unshift(1);
		countElements(list, 5);
	});
	it("should remove and return elements via remove", function () {
		const list = new List([1]);
		const element = new List.ListElement(2);
		list.push(element);
		list.push(3);
		list.push(4);
		list.push(5);
		expect(list.remove(element)).toBe(element);
	});
	it("should remove all elements via clear", function () {
		const list = new List([1,2,3,4,5]);
		list.clear();
		expect(list.size).toBe(0);
		expect(list.head.next).toBe(list.tail);
	});
	it("should remove and return the last element via pop", function () {
		const list = new List([1,2,3,4]);
		const element = new List.ListElement(5);
		list.push(element);
		expect(list.pop()).toBe(element);
	});
	it("should remove and return the first element via shift", function () {
		const list = new List([2,3,4,5]);
		const element = new List.ListElement(1);
		list.unshift(element);
		expect(list.shift()).toBe(element);
	});
	it("should find elements via find", function () {
		const list = new List([1,2,3,4,5]);
		const element = list.find(3);
		expect(element.payload).toBe(3);
	});
	it("should return the last element via first", function () {
		const list = new List([1,2,3,4,5]);
		const element = list.first();
		expect(element.payload).toBe(1);
	});
	it("should return the last element via last", function () {
		const list = new List([1,2,3,4,5]);
		const element = list.last();
		expect(element.payload).toBe(5);
	});
	it("should concatenate two lists via concat", function () {
		const list1 = new List([1,2,3,4,5]);
		const list2 = new List([6,7,8,9,10]);
		list1.concat(list2);
		countElements(list1, 10);
	});
	it("should move an element to the end of the list via pushBack", function () {
		const list = new List([1,2,3,4]);
		const element = new List.ListElement(5);
		
		expect(element.payload).toBe(5);
	});
	it("should copy elements via copyWithin", function() {
		const list1 = new List([1,2,3,4,5]);
		list1.copyWithin(-2);
		expect(testDiff([1,2,3,1,2], Array.from(list1).map(e => e.payload))).toBe(false);
		const list2 = new List([1,2,3,4,5]);
		list2.copyWithin(0, 3);
		expect(testDiff([4,5,3,4,5], Array.from(list2).map(e => e.payload))).toBe(false);
		const list3 = new List([1,2,3,4,5]);
		list3.copyWithin(0, 3, 4);
		expect(testDiff([4,2,3,4,5], Array.from(list3).map(e => e.payload))).toBe(false);
		const list4 = new List([1,2,3,4,5]);
		list4.copyWithin(-2, -3, -1);
		expect(testDiff([1,2,3,3,4], Array.from(list4).map(e => e.payload))).toBe(false);
	});
}
// Tests for DoubleLinkedList
function dllTests(List) {
	it("should link ListElements in both directions", function () {
		const list = new List([1,2,3,4,5]);
		var prevElement = list.head;
		for (const element of list) {
			expect(element.prev).not.toBeNull();
			expect(element.prev).toBe(prevElement);
			prevElement = element;
		}
	});
}
// Tests for CircularLinkedList
function cllTests(List) {
	it("should link the tail ListElement to the head ListElement", function () {
		const list = new List([1,2,3,4,5]);
		expect(list.tail.next).toBe(list.head);
	});
}
describe("LinkedList", () => llTests(LinkedList));
describe("CircularLinkedList", function () {
	llTests(CircularLinkedList);
	cllTests(CircularLinkedList);
});
describe("DoubleLinkedList", function () {
	llTests(DoubleLinkedList);
	dllTests(DoubleLinkedList);
});
describe("CircularDoubleLinkedList", function () {
	llTests(CircularDoubleLinkedList);
	dllTests(CircularDoubleLinkedList);
	cllTests(CircularDoubleLinkedList);
	it("should link the head ListElement to the tail ListElement", function () {
		const list = new CircularDoubleLinkedList([1,2,3,4,5]);
		expect(list.head.prev).toBe(list.tail);
	});
});