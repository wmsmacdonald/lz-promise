export class LazyPromise<T> extends Function {
  promise: Promise<T> = null;
  promiseCreator: () => Promise<T>;

  constructor(
    executor: (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    super();
    this.promiseCreator = () => new Promise(executor);

    return <LazyPromise<T>>new Proxy(this, {
      apply: () => this.force()
    });
  }

  static fromPromiseCreator<T>(promiseCreator: () => Promise<T>) {
    return new LazyPromise<T>((resolve, reject) => {
      promiseCreator().then(resolve, reject);
    });
  }

  force = (): Promise<T> => {
    if (!this.promise) {
      this.promise = this.promiseCreator();
    }
    return this.promise;
  };

  then = <TResult1 = T, TResult2 = never>(
    onFulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onRejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): LazyPromise<TResult1 | TResult2> =>
    LazyPromise.fromPromiseCreator(() =>
      this.force().then(onFulfilled, onRejected)
    );

  catch = <TResult = never>(
    onRejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): LazyPromise<T | TResult> =>
    LazyPromise.fromPromiseCreator(() => this.force().catch(onRejected));

  finally = (onFinally?: (() => void) | undefined | null): LazyPromise<T> =>
    LazyPromise.fromPromiseCreator<T>(() => this.force().finally(onFinally));

  static resolve<T>(value?: T | LazyPromise<T>): LazyPromise<T> {
    return LazyPromise.fromPromiseCreator(() => Promise.resolve(value));
  }

  static reject<T = never>(reason?: any): LazyPromise<T> {
    return LazyPromise.fromPromiseCreator(() => Promise.reject(reason));
  }

  static all<T>(values: (T | LazyPromise<T>)[]): LazyPromise<T[]> {
    return LazyPromise.fromPromiseCreator(() =>
      Promise.all(values.map(LazyPromise.resolve))
    );
  }

  static race<T>(values: (T | PromiseLike<T>)[]): LazyPromise<T> {
    return LazyPromise.fromPromiseCreator(() =>
      Promise.race(values.map(LazyPromise.resolve))
    );
  }
}

export function lz<T>(promiseCreator: () => Promise<T>) {
  return LazyPromise.fromPromiseCreator<T>(promiseCreator);
}
