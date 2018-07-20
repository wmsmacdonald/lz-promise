# lz-promise

Lazy evaluation for asynchronous operations to simplify writing
efficient imperative control flow.

Inspired by lazy evaluation in languages like Haskell and Scala,
except only for async operations.


```javascript
const { lz } = require('lz-promise');

async function withLazy() {
  const lazyValue1 = lz(() => costlyApiCall1());
  const lazyValue2 = lz(() => costlyApiCall2());

  if (x) {
    // result of costlyApiCall1() is stored for next lazy usage
    console.log(await lazyValue1());
  }

  if (y) {
    // uses last result if available
    console.log(await lazyValue1());
    console.log(await lazyValue2());
  }

  if (z) {
    console.log(await lazyValue2());
  }
}

// example of memoization by checking whether value has been defined
// far more cluttered
async function withoutLazy() {
  let value1;
  let value2;

  if (x) {
    value1 = await costlyApiCall1();
    console.log(value1);
  }

  if (y) {
    // have to check for previous definition for every usage
    if (!value1) {
        value1 = await costlyApiCall1();
    }
    console.log(lazyValue1);
    value2 = await costlyApiCall2();
    console.log(lazyValue2);
  }

  if (z) {
    if (!value2) {
        value2 = await costlyApiCall2();
    }
    console.log(value2);
  }
}

```