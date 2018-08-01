# lz-promise

![npm](https://img.shields.io/npm/l/express.svg)
[![Build Status](https://travis-ci.org/wmsmacdonald/lz-promise.svg?branch=master)](https://travis-ci.org/wmsmacdonald/lz-promise)
[![Coverage Status](https://coveralls.io/repos/github/wmsmacdonald/lz-promise/badge.svg?branch=master)](https://coveralls.io/github/wmsmacdonald/lz-promise?branch=master)



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
async function sendLastMessageToAllUsers(lazyLastMessage, users) {
  // if users is empty, no time is wasted fetching the last message
  await Promise.all(users.map(async user => user.send(await lazyMessage));
}
```
  
# API
## Classes

<dl>
<dt><a href="#LazyPromise">LazyPromise</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#lz">lz(promiseCreator)</a> ⇒ <code><a href="#LazyPromise">LazyPromise</a></code></dt>
<dd><p>Alias for LazyPromise.fromPromiseCreator that creates a new LazyPromise from a function that returns a Promise.</p></dd>
</dl>

<a name="LazyPromise"></a>

## LazyPromise
**Kind**: global class  

* [LazyPromise](#LazyPromise)
    * [new LazyPromise(executor)](#new_LazyPromise_new)
    * _instance_
        * [.then(onFulfilled, onRejected)](#LazyPromise+then) ⇒ <code>Promise</code>
        * [.catch(onRejected)](#LazyPromise+catch) ⇒ <code>Promise</code>
        * [.finally(onFinally)](#LazyPromise+finally) ⇒ <code>Promise</code>
    * _static_
        * [.fromPromiseCreator(promiseCreator)](#LazyPromise.fromPromiseCreator)
        * [.resolve(value)](#LazyPromise.resolve) ⇒ <code>Promise</code>
        * [.reject(reason)](#LazyPromise.reject) ⇒ [<code>LazyPromise</code>](#LazyPromise)
        * [.all(values)](#LazyPromise.all) ⇒ [<code>LazyPromise</code>](#LazyPromise)
        * [.race(values)](#LazyPromise.race) ⇒ [<code>LazyPromise</code>](#LazyPromise)

<a name="new_LazyPromise_new"></a>

### new LazyPromise(executor)
<p>Creates a new LazyPromise with the standard Promise constructor, except that executor
is deferred until .then(), .catch(), or .finally() is called.</p>


| Param | Type | Description |
| --- | --- | --- |
| executor | <code>function</code> | <p>Callback used to initialize the promise. This callback is passed two arguments: a resolve callback used resolve the promise with a value or the result of another promise, and a reject callback used to reject the promise with a provided reason or error.</p> |

<a name="LazyPromise+then"></a>

### lazyPromise.then(onFulfilled, onRejected) ⇒ <code>Promise</code>
<p>Calls the executor if it has not been executed.
Attaches callbacks for the resolution and/or rejection of the resulting Promise.</p>

**Kind**: instance method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <code>Promise</code> - <p>A Promise for the completion of which ever callback is executed.</p>  

| Param | Type | Description |
| --- | --- | --- |
| onFulfilled | <code>function</code> | <p>The callback to execute when the Promise is resolved.</p> |
| onRejected | <code>function</code> | <p>The callback to execute when the Promise is rejected.</p> |

<a name="LazyPromise+catch"></a>

### lazyPromise.catch(onRejected) ⇒ <code>Promise</code>
<p>Calls the executor if it has not been executed.
Attaches a callback for only the rejection of the resulting Promise.</p>

**Kind**: instance method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <code>Promise</code> - <p>A Promise for the completion of the callback.</p>  

| Param | Type | Description |
| --- | --- | --- |
| onRejected | <code>function</code> | <p>The callback to execute when the Promise is rejected.</p> |

<a name="LazyPromise+finally"></a>

### lazyPromise.finally(onFinally) ⇒ <code>Promise</code>
<p>Calls the executor if it has not been executed.
Attaches a callback that is invoked when the resulting Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.</p>

**Kind**: instance method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <code>Promise</code> - <p>A Promise for the completion of the callback.</p>  

| Param | Type | Description |
| --- | --- | --- |
| onFinally | <code>function</code> | <p>The callback to execute when the Promise is settled (fulfilled or rejected).</p> |

<a name="LazyPromise.fromPromiseCreator"></a>

### LazyPromise.fromPromiseCreator(promiseCreator)
<p>Creates a new LazyPromise from a function that returns a Promise.</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  

| Param | Type | Description |
| --- | --- | --- |
| promiseCreator | <code>function</code> | <p>Function that the returns the Promise to be deferred until .then(), .catch(), or .finally() is called.</p> |

<a name="LazyPromise.resolve"></a>

### LazyPromise.resolve(value) ⇒ <code>Promise</code>
<p>Creates a new resolved LazyPromise for the provided value.
Equivalent to Promise.resolve() because value is already executed</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <code>Promise</code> - <p>A promise whose internal state matches the provided value.</p>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | <p>The value which is resolved</p> |

<a name="LazyPromise.reject"></a>

### LazyPromise.reject(reason) ⇒ [<code>LazyPromise</code>](#LazyPromise)
<p>Creates a new rejected LazyPromise for the provided value.
Equivalent to Promise.reject() because value is already executed</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: [<code>LazyPromise</code>](#LazyPromise) - <p>A promise whose internal state matches the provided value.</p>  

| Param | Type | Description |
| --- | --- | --- |
| reason | <code>any</code> | <p>The value which is rejected</p> |

<a name="LazyPromise.all"></a>

### LazyPromise.all(values) ⇒ [<code>LazyPromise</code>](#LazyPromise)
<p>Creates a LazyPromise that, when .then(), .catch(), or .finally() is called, is resolved with an
array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: [<code>LazyPromise</code>](#LazyPromise) - <p>A new LazyPromise.</p>  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Iterable</code> | <p>An iterator of Promises, values, or LazyPromises</p> |

<a name="LazyPromise.race"></a>

### LazyPromise.race(values) ⇒ [<code>LazyPromise</code>](#LazyPromise)
<p>Creates a LazyPromise that, when .then(), .catch(), or .finally() is called, is resolved or rejected
when any of the provided Promises are resolved or rejected that Promise's value.</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: [<code>LazyPromise</code>](#LazyPromise) - <p>A new LazyPromise.</p>  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Iterable</code> | <p>An iterator of Promises, values, or LazyPromises.</p> |

<a name="lz"></a>

## lz(promiseCreator) ⇒ [<code>LazyPromise</code>](#LazyPromise)
<p>Alias for LazyPromise.fromPromiseCreator that creates a new LazyPromise from a function that returns a Promise.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promiseCreator | <code>function</code> | <p>Function that the returns the Promise to be deferred until .then(), .catch(), or .finally() is called.</p> |

