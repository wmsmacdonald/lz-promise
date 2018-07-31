## Classes

<dl>
<dt><a href="#LazyPromise">LazyPromise</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#lz">lz(promiseCreator)</a> ⇒ <code>LazyPromise.&lt;T&gt;</code></dt>
<dd><p>Alias for LazyPromise.fromPromiseCreator
Creates a new LazyPromise from a function that returns a Promise.</p></dd>
</dl>

<a name="LazyPromise"></a>

## LazyPromise
**Kind**: global class  

* [LazyPromise](#LazyPromise)
    * [new LazyPromise(executor)](#new_LazyPromise_new)
    * _instance_
        * [.then(onFulfilled, onRejected)](#LazyPromise+then) ⇒
        * [.catch(onRejected)](#LazyPromise+catch) ⇒
        * [.finally(onFinally)](#LazyPromise+finally) ⇒
    * _static_
        * [.fromPromiseCreator(promiseCreator)](#LazyPromise.fromPromiseCreator)
        * [.resolve(value)](#LazyPromise.resolve) ⇒
        * [.reject(reason)](#LazyPromise.reject) ⇒
        * [.all(values)](#LazyPromise.all) ⇒
        * [.race(values)](#LazyPromise.race) ⇒

<a name="new_LazyPromise_new"></a>

### new LazyPromise(executor)
<p>Creates a new LazyPromise with the standard Promise constructor.</p>


| Param | Description |
| --- | --- |
| executor | <p>A callback used to initialize the promise. This callback is passed two arguments: a resolve callback used resolve the promise with a value or the result of another promise, and a reject callback used to reject the promise with a provided reason or error. The executor is deferred until .then(), .catch(), or .finally() is called.</p> |

<a name="LazyPromise+then"></a>

### LazyPromise.then(onFulfilled, onRejected) ⇒
<p>Calls the executor if it has not been executed.
Attaches callbacks for the resolution and/or rejection of the resulting Promise.</p>

**Kind**: instance method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <p>A Promise for the completion of which ever callback is executed.</p>  

| Param | Description |
| --- | --- |
| onFulfilled | <p>The callback to execute when the Promise is resolved.</p> |
| onRejected | <p>The callback to execute when the Promise is rejected.</p> |

<a name="LazyPromise+catch"></a>

### LazyPromise.catch(onRejected) ⇒
<p>Calls the executor if it has not been executed.
Attaches a callback for only the rejection of the resulting Promise.</p>

**Kind**: instance method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <p>A Promise for the completion of the callback.</p>  

| Param | Description |
| --- | --- |
| onRejected | <p>The callback to execute when the Promise is rejected.</p> |

<a name="LazyPromise+finally"></a>

### LazyPromise.finally(onFinally) ⇒
<p>Calls the executor if it has not been executed.
Attaches a callback that is invoked when the resulting Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.</p>

**Kind**: instance method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <p>A Promise for the completion of the callback.</p>  

| Param | Description |
| --- | --- |
| onFinally | <p>The callback to execute when the Promise is settled (fulfilled or rejected).</p> |

<a name="LazyPromise.fromPromiseCreator"></a>

### LazyPromise.fromPromiseCreator(promiseCreator)
<p>Creates a new LazyPromise from a function that returns a Promise.</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  

| Param | Description |
| --- | --- |
| promiseCreator | <p>Function that the returns the Promise to be deferred until .then(), .catch(), or .finally() is called.</p> |

<a name="LazyPromise.resolve"></a>

### LazyPromise.resolve(value) ⇒
<p>Creates a new resolved LazyPromise for the provided value.
Equivalent to Promise.resolve() because value is already executed</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <p>A promise whose internal state matches the provided promise.</p>  

| Param | Description |
| --- | --- |
| value | <p>The value which is resolved</p> |

<a name="LazyPromise.reject"></a>

### LazyPromise.reject(reason) ⇒
<p>Creates a new rejected LazyPromise for the provided value.
Equivalent to Promise.reject() because value is already executed</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <p>A promise whose internal state matches the provided promise.</p>  

| Param | Description |
| --- | --- |
| reason | <p>The value which is rejected</p> |

<a name="LazyPromise.all"></a>

### LazyPromise.all(values) ⇒
<p>Creates a LazyPromise that, when .then(), .catch(), or .finally() is called, is resolved with an
array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <p>A new LazyPromise.</p>  

| Param | Description |
| --- | --- |
| values | <p>An iterator of Promises, values, or LazyPromises</p> |

<a name="LazyPromise.race"></a>

### LazyPromise.race(values) ⇒
<p>Creates a LazyPromise that, when .then(), .catch(), or .finally() is called, is resolved or rejected
when any of the provided Promises are resolved or rejected that Promise's value.</p>

**Kind**: static method of [<code>LazyPromise</code>](#LazyPromise)  
**Returns**: <p>A new LazyPromise.</p>  

| Param | Description |
| --- | --- |
| values | <p>An iterator of Promises, values, or LazyPromises.</p> |

<a name="lz"></a>

## lz(promiseCreator) ⇒ <code>LazyPromise.&lt;T&gt;</code>
<p>Alias for LazyPromise.fromPromiseCreator
Creates a new LazyPromise from a function that returns a Promise.</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| promiseCreator | <p>Function that the returns the Promise to be deferred until .then(), .catch(), or .finally() is called.</p> |

