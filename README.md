# lz-promise

Lazy evaluation for asynchronous operations to simplify writing
efficient imperative control flow.

Inspired by lazy evaluation in languages like Haskell and Scala,
except only for async operations.

### Motivation
One pitfall of Promises is that they immediately execute with construction. When programming imperatively with async/await, there are often values resulting from IO calls that you only use if the code follows a particular path. It is difficult to write elegant code while minimizing these costly operations. This package solves this problem by deferring the execution of the Promise until its value is needed, and saving the value for later use, so it is never excecuted more than necessary.

### Usage
```javascript
const { lz } = require('lz-promise');

// creates a LazyPromise
const lazyValue = lz(() => new Promise(resolve => {
  console.log('executing');
  resolve();
));

// only executes when .then(), .catch(), or .finall() is called on LazyPromise
await lazyValue; // > executing

```

### Examples
#### Early return
```javascript
// build logically parameterized abstrations without worrying about minimizing IO calls
async function sendMessageToUser(message, lazyUser) {
  if (message.trim().length === 0) {
    throw new Error('message must have content');
  }
  const user = await lazyUser;
  user.send(message); 
  // ...
}

async function main() {
  const lazyUser = lz(() => api.getUser(id);
  await sendMessageToUser('hello', lazyUser);
  if (/* someCondition*/){
    // will only make API call if we haven't already
    const user = await lazyUser;
    await user.update();
  }
}
```
#### Conditional Control Flow
```javascript
async function withLazy() {
  const lazyValue1 = lz(() => costlyApiCall1());
  const lazyValue2 = lz(() => costlyApiCall2());

  if (x) {
    // result of costlyApiCall1() is stored for next lazy usage
    console.log(await lazyValue1);
  }

  if (y) {
    // uses last result if available
    console.log(await lazyValue1);
    console.log(await lazyValue2);
  }

  if (z) {
    console.log(await lazyValue2);
  }
}
```
#### Array Operations
```javascript
function sendLastMessageToAllUsers(lazyLastMessage, users) {
  // if users is empty, no time is wasted fetching the last message
  await Promise.all(users.map(async user => user.send(await lazyMessag));
}
```
```
  

