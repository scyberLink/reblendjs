# Reblend Deep Equal Iterative

Non-recursive deep comparison with:

* Support for **circular references**
* **Configurable depth and key ignoring**
* **Function comparison**, including custom properties

---

## Installation

To add this to your project:

```
npm install reblend-deep-equal-iterative
```

---

## Usage

Here’s a simple example of how you can use it:

```ts
import deepEqual from "reblend-deep-equal-iterative";

function foo() { return 42 }
function bar() { return 42 }
foo.prop = "foo";
bar.prop = "foo";

// true
deepEqual(foo, bar);
```

---

## API

```ts
function deepEqual(
  a: any,
  b: any,
  config?: {
    keyThreshold?: number;
    depthThreshold?: number;
    shouldIgnoreKey?: (key: string | symbol, a: any, b: any) => boolean;
    shouldIgnoreObject?: (a: any) => boolean;
  }
): boolean
```

---

## Features

✅ **Non-recursive:** Uses a stack instead of deep recursion.
✅ **Circular-safe:** Detects and handles circular references gracefully.
✅ **Customizable:** Allows ignoring certain keys or properties.
✅ **Function-safe:** Performs deep comparison of function properties and code.