// @flow
function f(n: number): number {
  return n * n;
}


function g(value: mixed) {
  // '' + value;
}


// f('2');

function multiply(a: number, b: number): number {
  return a * b;
}

// multiply(3, 'string');

function acceptBoolean(value: boolean) {
  // ...
}
acceptBoolean(!!0);

// @flow
function acceptsObject(value: { foo?: string }) {
  // ...
}

acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
// acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!


// @flow
function acceptsOptionalString(value: string = "foo") {
  // ...
  console.log(value)
}

acceptsOptionalString("bar");     // Works!
acceptsOptionalString(undefined); // Works!
// acceptsOptionalString(null);      // Error!
acceptsOptionalString();          // Works!

// @flow
function acceptsMaybeNumber(value: ?number) {
  if (value !== null && value !== undefined) {
    return value * 2;
  }
}

// const foo /* : number */ = 1;

// @flow
function concat(a: string, b: string): string {
  return a + b;
}

concat("foo", "bar"); // Works!
// const r: number = concat("foo", "bar"); // Error!
// $ExpectError
// concat(true, false);  // Error!

// function method(): boolean {
//   if (Math.random() > 0.5) {
//     return true;
//   }
// }


var obj = {};

obj.foo = 1;
obj.bar = true;

// var foo: number  = obj.foo; // Works!
var bar: boolean = obj.bar; // Works!
var baz: string = obj.baz; // Works?

// @flow
// const foo: {| foo: string |} = { foo: "Hello", bar: "World!" }; // Error!


// @flow
let array: Array<number> = [];

array[0] = 0;
array[2] = 2;

let value: number = array[1]; // Works.
// ^ undefined

// @flow
// let tuple: [number, boolean, string] = [1, true, "three"];

// let none: void = tuple[3];


// @flow
let tuple: [number, number] = [1, 2];
tuple.join(', '); // Works!
tuple.length;
tuple.slice(2);
// $ExpectError
// tuple.push(3);    // Error!


// @flow
// $ExpectError
function toStringPrimitives(value: number | boolean | string): string { // Error!
  if (typeof value === 'number') {
    return String(value);
  } else if (typeof value === 'boolean') {
    return String(value);
  } else {
    return '';
  }
}

// @flow
type Response = {
  success: boolean,
  value?: boolean,
  error?: string
};

// function handleResponse(response: Response) {
//   if (response.success) {
//     // $ExpectError
//     var value: boolean = response.value; // Error!
//   } else {
//     // $ExpectError
//     var error: string = response.error; // Error!
//   }
// }


// @flow
type Success = { success: true, value: boolean };
type Failed = { success: false, error: string };

type Response2 = Success | Failed;

function handleResponse(response: Response2) {
  if (response.success) {
    var value: boolean = response.value; // Works!
  } else {
    var error: string = response.error; // Works!
  }
}


function stringify(obj: mixed): string {
  return JSON.stringify(obj);
}

// @flow
function fn(obj: any): number {
  let foo: number = obj.foo;
  let bar: number = foo * 2;
  return bar;
}

let bar2: number = fn({ foo: 2 });
let baz2: string = "baz:" + bar2;



let str1: 'hello' = 'hello';
// $ExpectError
let str2: typeof str1 = 'hello'; // Error!





export default f;