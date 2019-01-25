# LinkedList
Singly linked, doubly linked, and circular LinkedList classes.

[![NPM](https://nodei.co/npm/listlib.png)](https://nodei.co/npm/listlib/)

- [`LinkedList`](#linkedlist)
  - [Instance Properties](#instance-properties)
    - [`head`](#linkedlisthead)
    - [`tail`](#linkedlisttail)
    - [`size`](#linkedlistsize)
    - [`double`](#linkedlistdouble)
    - [`circular`](#linkedlistcircular)
  - [Constructor Properties](#constructor-properties)
    - [`ListElement`](#linkedlistlistelement)
  - [Prototype Methods](#prototype-methods)
    - [`@@iterator`](#linkedlistprototypeiterator)
    - [`values`](#linkedlistprototypevalues)
    - [`elements`](#linkedlistprototypeelements)
    - [`forEach`](#linkedlistprototypeforeach)
    - [`fromIterable`](#linkedlistprototypefromiterable)
    - [`coerceElement`](#linkedlistprototypecoerceelement)
    - [`item`](@linkedlistprototypeitem)
    - [`find`](@linkedlistprototypefind)
    - [`clear`](@linkedlistprototypeclear)
    - [`concat`](@linkedlistprototypeconcat)
    - [`remove`](@linkedlistprototyperemove)
    - [`insertBefore`](@linkedlistprototypeinsertbefore)
    - [`insertAfter`](@linkedlistprototypeinsertafter)
    - [`prepend`](@linkedlistprototypeprepend)
    - [`unshift`](@linkedlistprototypeunshift)
    - [`append`](@linkedlistprototypeappend)
    - [`push`](@linkedlistprototypepush)
    - [`shift`](@linkedlistprototypeshift)
    - [`pushBack`](@linkedlistprototypepushback)
- [`DoubleLinkedList`](#doublelinkedlist)
- [`CircularLinkedList`](#circularlinkedlist)
- [`CircularDoubleLinkedList`](#circularlinkedlist)
- [`ListElement`](#listelement)
  - [Prototype Methods](#prototype-methods-1)
    - [`fromElement`](@fromelement)

You can import the list constructors like so:

```JavaScript
const listlib = require("listlib");
const LinkedList = listlib.LinkedList;
const DoubleLinkedList = listlib.DoubleLinkedList;
const CircularLinkedList = listlib.CircularLinkedList;
const CircularDoubleLinkedList = listlib.CircularDoubleLinkedList;

// Using ES6 Destructuring Assignment
const {
  LinkedList,
  DoubleLinkedList,
  CircularLinkedList,
  CircularDoubleLinkedList
} = require("listlib");
```

---

# `LinkedList`

*Constructor*

```JavaScript
new LinkedList( [ iterable = null ] );
```
> Uses [ListElement](#listelement) to represent the list structure.

Acyclic Singly Linked List.

## Constructor Parameters
- **`iterable`** (*Optional*) Iterable

  The values of the optional Iterable will be used to populate the new LinkedList.

## Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Append "6" to the end of the list, returns a new ListElement.
var six = list.push(6);

// Prepends "7" to the beginning of the list, returns a new ListElement.
var seven = list.unshift(7);

// Moves "7" to the end of the list.
list.pushBack(seven);

// Logs 1, 2, 3, 4, 5, 6, and 7.
for (const element of list) {
	console.log(element.payload);
}
```

## Instance Properties

### `LinkedList.head`

*ListElement*
```JavaScript
LinkedList.head
```
A ListElement which is considered the head/start of the list, and is used to begin enumeration of subsequent ListElements.

### `LinkedList.tail`

*ListElement*
```JavaScript
LinkedList.tail
```
A ListElement which is considered the tail/end of the list, and is used to end enumeration of preceding ListElements.

### `LinkedList.size`

*Number*
```JavaScript
LinkedList.size
```
A number representing the quantity of ListElements within the LinkedList, not counting the head and tail elements.

### `LinkedList.double`

*Boolean*
```JavaScript
LinkedList.double
```
Indicates if the LinkedList is doubly linked, linking every ListElement in both directions.

### `LinkedList.circular`

*Boolean*
```JavaScript
LinkedList.circular
```
Indicates if the LinkedList is circular, linking the head and tail elements.

---

## Constructor Properties

### `LinkedList.ListElement`

[See the ListElement documentation.](#listelement)

---

## Prototype Methods

### `LinkedList.prototype.@@iterator`

*Iterator*
```JavaScript
LinkedList[Symbol.iterator]( [ ends = false ] );
```
An iterator which yields each ListElement in the LinkedList, except for the head and tail elements.

#### Parameters
- **`ends`** Boolean

  If set to `true`, the iterator will include the head/tail ListElements in iteration. In a circular LinkedList, this will cause the iterator to infinitely loop through the list unless some user-supplied break condition is in place.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Logs 1, 2, 3, 4, and 5.
for (const value of list) console.log(element.payload);
```

Example 1: `ends` Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Logs `null`, 1, 2, 3, 4, 5, and `null`.
for (const value of list[Symbol.iterator](true)) console.log(element.payload);
```

---

### `LinkedList.prototype.values`

*Iterator*
```JavaScript
LinkedList.values();
```
An iterator which yields the value of each ListElement in the LinkedList.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Logs 1, 2, 3, 4, and 5.
for (const value of list.values()) console.log(value);
```

---

### `LinkedList.prototype.elements`

*Iterator*
```JavaScript
LinkedList.elements();
```
An iterator which yields each ListElement in the LinkedList, except for the head and tail elements.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Logs 1, 2, 3, 4, and 5.
for (const value of list.values()) console.log(value);
```

---

# `forEach`

*Higher-Order Function*
```JavaScript
LinkedList.forEach( callback );
```
Calls `callback` with the value of each ListElement.

## Parameters
- **`callback`** Function

  The callback function to execute for each ListElement value.

### Callback Parameters
- **`value`**

  The value of the current ListElement being enumerated over.

- **`index`**

  The index (Starting at zero) of the current ListElement being enumerated over.

- **`list`**

  The target LinkedList being iterated through.

## Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Logs 1, 2, 3, 4, and 5.
list.forEach(function (value, index, list) {
  console.log(value);
});
```

---

### `LinkedList.prototype.fromIterable`

*Function*
```JavaScript
LinkedList.fromIterable( iterable );
```
Inserts the values of the Iterable into the LinkedList.

#### Parameters
- **`iterable`** Iterable

  The iterable to copy values from.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New empty LinkedList is created.
var list = new LinkedList();

// Contents of `arr` are inserted into the list.
list.fromIterable(arr);
```

---

### `LinkedList.prototype.coerceElement`

*Function*
```JavaScript
LinkedLst.coerceElement( value );
```
Creates a new ListElement using `value`. If `value` is already a ListElement, it is returned.

#### Parameters
- **`value`** Any

  A ListElement, or a value to create a new ListElement with.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Arbitrary number.
var numbers = 123;

// Returns a new ListElement with `numbers` assigned to `element.payload`.
var element = LinkedList.coerceElement(numbers);
```

---

### `LinkedList.prototype.item`

*Function*
```JavaScript
LinkedList.item( index );
```
Returns the ListElement at the specified 0-indexed offset from the head element, or `null` if it was not found.

#### Parameters
- **`index`** Number

  An offset from the head element, starting at zero, to look for a ListElement at.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Returns the ListElement at index 4, the last element in the list, which contains "5".
var foundElement = list.item(4);
```

---

### `LinkedList.prototype.find`

*Function*
```JavaScript
LinkedList.find( value );
```
Returns the first ListElement encountered that contains a payload matching `value`, or `null` if one was not found.

#### Parameters
- **`value`** Any

  A value to search for in the LinkedList.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Returns the ListElement containing "3".
var foundElement = list.find(3);
```

---

### `LinkedList.prototype.clear`

*Function*
```JavaScript
LinkedList.clear();
```
Removes all elements from the LinkedList.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// List becomes empty.
list.clear();
```

---

### `LinkedList.prototype.concat`

*Function*
```JavaScript
LinkedList.concat( list1 [, list2, ..., listN ] );
```
Concatenates multiple LinkedLists into the callee LinkedList.

#### Parameters
- **`list1`...`listN`** ListElement

  An argument list of LinkedLists to concatenate.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedLists are created using the contents of `arr`.
var list1 = new LinkedList(arr);
var list2 = new LinkedList(arr);
var list3 = new LinkedList(arr);

// Appends `list2` and `list3` to the end of `list1`.
list1.concat(list2, list3);

// Logs 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5.
for (const element of list) {
	console.log(element.payload);
}
```

---

### `LinkedList.prototype.remove`

*Function*
```JavaScript
LinkedList.remove( element );
```
Removes and returns an element from the LinkedList.

#### Parameters
- **`element`** ListElement

  A ListElement object to remove from the LinkedList.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Get the element which contains "3".
var three = list.find(3);

// Removes the element from the list.
list.remove(three);
```

---

### `LinkedList.prototype.insertBefore`

*Function*
```JavaScript
LinkedList.insertBefore( element, newElement );
```
Inserts a ListElement before `element`

#### Parameters
- **`element`** ListElement

  A ListElement object to prepend with newElement.

- **`element`** Any

  A ListElement or arbitrary value to add to the LinkedList before `element`.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Get the element which contains "3".
var three = list.find(3);

// Inserts "2.5" before "3".
var twoPointFive = list.insertBefore(three, 2.5);
```

---

### `LinkedList.prototype.insertAfter`

*Function*
```JavaScript
LinkedList.insertAfter( element, newElement );
```
Inserts a ListElement after `element`

#### Parameters
- **`element`** ListElement

  A ListElement object to prepend with newElement.

- **`element`** Any

  A ListElement or arbitrary value to add to the LinkedList after `element`.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Get the element which contains "3".
var three = list.find(3);

// Inserts "3.5" after "3".
var threePointFive = list.insertAfter(three, 3.5);
```

---

### `LinkedList.prototype.prepend`

*Function*
```JavaScript
LinkedList.prepend( element );
```
> Alias: `unshift`

Inserts a ListElement at the beginning of the LinkedList.

#### Parameters
- **`element`** Any

  A ListElement object to prepend the LinkedList with.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Inserts "0" at the beginning of the list.
var zero = list.prepend(0);
```

---

### `LinkedList.prototype.unshift`

*Function*
```JavaScript
LinkedList.unshift( element );
```
An alias of [`LinkedList.prepend`](@prepend).

---

### `LinkedList.prototype.append`

*Function*
```JavaScript
LinkedList.append( element );
```
> Alias: `push`

Inserts a ListElement at the end of the LinkedList.

#### Parameters
- **`element`** Any

  A ListElement object to append the LinkedList with.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Inserts "6" at the end of the list.
var six = list.append(6);
```

---

### `LinkedList.prototype.push`

*Function*
```JavaScript
LinkedList.push( element );
```
An alias of [`LinkedList.prototype.append`](@append).

---

### `LinkedList.prototype.shift`

*Function*
```JavaScript
LinkedList.shift();
```
Removes an element from the beginning of the LinkedList and returns it.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Removes and returns the first element in the list.
var one = list.shift();
```

---

### `LinkedList.prototype.pushBack`

*Function*
```JavaScript
LinkedList.pushBack( element );
```
Moves a ListElement to the end of the LinkedList.

#### Parameters
- **`element`** Any

  A ListElement object to move to the end of the LinkedList.

#### Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New LinkedList is created using the contents of `arr`.
var list = new LinkedList(arr);

// Returns the element containing "2".
var two = list.find(2);

// Moves "2" to the end of the list.
list.pushBack(two);
```

---

# `DoubleLinkedList`

*Constructor*

```JavaScript
new DoubleLinkedList( [ iterable = null ] );
```
> Inherits from [LinkedList](#linkedlist)

> Uses [ListElement](#listelement) to represent the list structure.

> Refer to the [LinkedList](#linkedlist) documentation for member methods & properties.

Circular Doubly Linked List. Elements have references to previous elements, making some operations faster.

## Constructor Parameters
- **`iterable`** (*Optional*) Iterable

  The values of the optional Iterable will be used to populate the new CircularDoubleLinkedList.

## Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New DoubleLinkedList is created using the contents of `arr`.
var list = new DoubleLinkedList(arr);

// Append "6" to the end of the list, returns a new ListElement.
var six = list.push(6);

// Prepends "7" to the beginning of the list, returns a new ListElement.
var seven = list.unshift(7);

// Moves "7" to the end of the list.
list.pushBack(seven);

// Logs 1, 2, 3, 4, 5, 6, and 7.
for (const element of list) {
	console.log(element.payload);
}
```

---

# `CircularLinkedList`

*Constructor*

```JavaScript
new CircularLinkedList( [ iterable = null ] );
```
> Inherits from [LinkedList](#linkedlist)

> Uses [ListElement](#listelement) to represent the list structure.

> Refer to the [LinkedList](#linkedlist) documentation for member methods & properties.

Circular Singly Linked List. The tail and head elements are connected to create a cycle. Iterators will infinitely loop through this list unless they are either interrupted or the list structure becomes broken.

## Constructor Parameters
- **`iterable`** (*Optional*) Iterable

  The values of the optional Iterable will be used to populate the new CircularDoubleLinkedList.

## Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New CircularLinkedList is created using the contents of `arr`.
var list = new CircularLinkedList(arr);

// Append "6" to the end of the list, returns a new ListElement.
var six = list.push(6);

// Prepends "7" to the beginning of the list, returns a new ListElement.
var seven = list.unshift(7);

// Moves "7" to the end of the list.
list.pushBack(seven);

// Repeatedly logs 1, 2, 3, 4, 5, 6, and 7, in an infinite loop.
for (const element of list) {
	console.log(element.payload);
}
```

---

# `CircularDoubleLinkedList`

*Constructor*

```JavaScript
new CircularDoubleLinkedList( [ iterable = null ] );
```
> Inherits from [LinkedList](#linkedlist)

> Uses [ListElement](#listelement) to represent the list structure.

> Refer to the [LinkedList](#linkedlist) documentation for member methods & properties.

Circular Doubly Linked List. Elements have references to previous elements, making some operations faster. The tail and head elements are connected to create a cycle. Iterators will infinitely loop through this list unless they are either interrupted or the list structure becomes broken.

## Constructor Parameters
- **`iterable`** (*Optional*) Iterable

  The values of the optional Iterable will be used to populate the new CircularDoubleLinkedList.

## Examples
Example 1: Basic Usage:

```JavaScript
// Array of arbitrary numbers.
var arr = [1,2,3,4,5];

// New CircularDoubleLinkedList is created using the contents of `arr`.
var list = new CircularDoubleLinkedList(arr);

// Append "6" to the end of the list, returns a new ListElement.
var six = list.push(6);

// Prepends "7" to the beginning of the list, returns a new ListElement.
var seven = list.unshift(7);

// Moves "7" to the end of the list.
list.pushBack(seven);

// Logs 1, 2, 3, 4, 5, 6, and 7.
for (const element of list) {
	console.log(element.payload);
}
```

---

# `ListElement`

*Constructor*
```JavaScript
new ListElement( [ payload = null ], [ next = null ], [ prev = null ] );
```
The class used internally by [LinkedList](#linkedlist) to represent an element of the Linked List.

## Parameters
- **`payload`** (*Optional*) Any

  Arbitrary data which is assigned to `ListElement.payload`.

- **`next`** (*Optional*) ListElement

  A `ListElement` to refer to as being next the next element.

- **`prev`** (*Optional*) ListElement

  A `ListElement` to refer to as being the previous element.

## Examples
Example 1: Basic Usage

```JavaScript
// A Number
var num = 123;

// Creates a new empty LinkedList.
var list = new LinkedList();

// Creates a new ListElement with `num` assigned to `element.payload`
var element = new list.ListElement(num);

// Appends `element` to the end of the list.
list.push(element);

// Removes `element` from the list.
list.remove(element);
```

## Prototype Methods

### `ListElement.prototype.fromElement`

*Function*
```JavaScript
ListElement.fromElement( element );
```
Copies the payload of a ListElement into the callee ListElement.

#### Parameters
- **`element`** ListElement

  A ListElement to copy the payload from.

#### Examples
Example 1: Basic Usage:

```JavaScript
// A source ListElement
var element1 = new LinkedList.ListElement(123);

// A destination ListElement
var element2 =  new LinkedList.ListElement();

// Copies the payload of `element1` into `element2`.
element2.fromElement(element1);
```