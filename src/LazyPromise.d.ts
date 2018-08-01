
export declare class LazyPromise<T> implements Promise<T>{
  private promise: Promise<T>;
  private readonly promiseCreator: () => Promise<T>;

  constructor(
    executor: (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  );

  static fromPromiseCreator<T>(promiseCreator: () => Promise<T>);

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onRejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;

  catch<TResult = never>(
    onRejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;

  finally(onFinally?: (() => void) | undefined | null): Promise<T>;

  static resolve<T>(value?: T | LazyPromise<T>): LazyPromise<T>;

  static reject<T = never>(reason?: any): LazyPromise<T>;

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
  static all<TAll>(values: Iterable<TAll | PromiseLike<TAll> | LazyPromise<TAll>>): LazyPromise<TAll[]>;

  /**
   * Creates a LazyPromise that, when .then(), .catch(), or .finally() is called, is resolved or rejected
   * when any of the provided Promises are resolved or rejected that Promise's value.
   * @param values {Iterable} An iterator of Promises, values, or LazyPromises.
   * @returns {LazyPromise} A new LazyPromise.
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
  static race<T>(values: Iterable<T | PromiseLike<T> | LazyPromise<T>>): LazyPromise<T>;

  readonly [Symbol.toStringTag]: "Promise";
  static readonly [Symbol.species]: PromiseConstructor;
}