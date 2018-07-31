/* class decorator */
function staticImplements<T>() {
  return (constructor: T) => {}
}

@staticImplements<PromiseConstructor>()
export class LazyPromise<T> implements Promise<T> {
  private promise: Promise<T> = null;
  private readonly promiseCreator: () => Promise<T>;

  /**
   * Creates a new LazyPromise with the standard Promise constructor.
   * @param executor callback used to initialize the promise. This callback is passed two arguments:
   * a resolve callback used resolve the promise with a value or the result of another promise,
   * and a reject callback used to reject the promise with a provided reason or error. The executor
   * is deferred until .then(), .catch(), or .finally() is called.
   */
  constructor(
    executor: (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    this.promiseCreator = () => new Promise(executor);
  }

  /**
   * Creates a new LazyPromise from a function that returns a Promise.
   * @param promiseCreator Function that the returns the Promise to be deferred until .then(), .catch(),
   * or .finally() is called.
   */
  static fromPromiseCreator<T>(promiseCreator: () => Promise<T>) {
    return new LazyPromise<T>((resolve, reject) => {
      promiseCreator().then(resolve, reject);
    });
  }

  /**
   * Calls the executor if it has not been executed.
   * Attaches callbacks for the resolution and/or rejection of the resulting Promise.
   * @param onFulfilled The callback to execute when the Promise is resolved.
   * @param onRejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onFulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onRejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2> {
    if (!this.promise) {
      this.promise = this.promiseCreator();
    }
    return this.promise.then<TResult1, TResult2>(onFulfilled, onRejected);
  }

  /**
   * Calls the executor if it has not been executed.
   * Attaches a callback for only the rejection of the resulting Promise.
   * @param onRejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onRejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult> { return  this.then().catch(onRejected) };

  /**
   * Calls the executor if it has not been executed.
   * Attaches a callback that is invoked when the resulting Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onFinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onFinally?: (() => void) | undefined | null): Promise<T> { return this.then().finally(onFinally); }

  /**
   * Creates a new resolved LazyPromise for the provided value.
   * Equivalent to Promise.resolve() because value is already executed
   * @param value The value which is resolved
   * @returns A promise whose internal state matches the provided promise.
   */
  static resolve<T>(value?: T | LazyPromise<T>): LazyPromise<T> {
    return LazyPromise.fromPromiseCreator(() => Promise.resolve(value));
  }

  /**
   * Creates a new rejected LazyPromise for the provided value.
   * Equivalent to Promise.reject() because value is already executed
   * @param reason The value which is rejected
   * @returns A promise whose internal state matches the provided promise.
   */
  static reject<T = never>(reason?: any): LazyPromise<T> {
    return LazyPromise.fromPromiseCreator(() => Promise.reject(reason));
  }

  /**
   * Creates a LazyPromise that, when .then(), .catch(), or .finally() is called, is resolved with an
   * array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
   * @param values An iterator of Promises, values, or LazyPromises
   * @returns A new LazyPromise.
   */
  static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): LazyPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
  static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): LazyPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
  static all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): LazyPromise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
  static all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): LazyPromise<[T1, T2, T3, T4, T5, T6, T7]>;
  static all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): LazyPromise<[T1, T2, T3, T4, T5, T6]>;
  static all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>]): LazyPromise<[T1, T2, T3, T4, T5]>;
  static all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>]): LazyPromise<[T1, T2, T3, T4]>;
  static all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): LazyPromise<[T1, T2, T3]>;
  static all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): LazyPromise<[T1, T2]>;
  static all<T1>(values: [T1 | PromiseLike<T1>]): LazyPromise<[T1]>;
  static all<TAll>(values: Iterable<TAll | PromiseLike<TAll> | LazyPromise<TAll>>): LazyPromise<TAll[]> {
    return LazyPromise.fromPromiseCreator(() => Promise.all(values));
  }

  /**
   * Creates a LazyPromise that, when .then(), .catch(), or .finally() is called, is resolved or rejected
   * when any of the provided Promises are resolved or rejected that Promise's value.
   * @param values An iterator of Promises, values, or LazyPromises.
   * @returns A new LazyPromise.
   */
  static race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): LazyPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
  static race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): LazyPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
  static race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): LazyPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
  static race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): LazyPromise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
  static race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): LazyPromise<T1 | T2 | T3 | T4 | T5 | T6>;
  static race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): LazyPromise<T1 | T2 | T3 | T4 | T5>;
  static race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): LazyPromise<T1 | T2 | T3 | T4>;
  static race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): LazyPromise<T1 | T2 | T3>;
  static race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): LazyPromise<T1 | T2>;
  static race<T>(values: (T | PromiseLike<T>)[]): LazyPromise<T>;
  static race<T>(values: Iterable<T | PromiseLike<T> | LazyPromise<T>>): LazyPromise<T> {
    return LazyPromise.fromPromiseCreator(() => Promise.race(values));
  }

  readonly [Symbol.toStringTag]: "Promise";
  static readonly [Symbol.species]: PromiseConstructor;
}

Object.setPrototypeOf(LazyPromise.prototype, Promise.prototype);
Object.setPrototypeOf(LazyPromise, Promise);

/**
 * Alias for LazyPromise.fromPromiseCreator
 * Creates a new LazyPromise from a function that returns a Promise.
 * @param promiseCreator Function that the returns the Promise to be deferred until .then(), .catch(), or .finally() is called.
 * @returns {LazyPromise<T>}
 */
export function lz<T>(promiseCreator: () => Promise<T>) {
  return LazyPromise.fromPromiseCreator<T>(promiseCreator);
}
