type GenericHandler = (results: Array<any>) => any | Promise<any>;

export class LazyPromise {
  static join<R1>(
    arg1: any | Promise<R1>,
    handler: (R1) => Promise<any> | any
  ): InvokableLazyPromise<[R1]>;
  static join<R1, R2>(
    arg1: any | Promise<R1>,
    arg2: any | Promise<R2>,
    handler: (R1, R2) => Promise<any> | any
  ): InvokableLazyPromise<[R1, R2]>;
  static join<R1, R2, R3>(
    arg1: any | Promise<R1>,
    arg2: any | Promise<R2>,
    arg3: any | Promise<R3>,
    handler: (R1, R2, R3) => Promise<any> | any
  ): InvokableLazyPromise<[R1, R2, R3]>;
  static join<R1, R2, R3, R4>(
    arg1: any | Promise<R1>,
    arg2: any | Promise<R2>,
    arg3: any | Promise<R3>,
    arg4: any | Promise<R4>,
    handler: (R1, R2, R3, R4) => Promise<any> | any
  ): InvokableLazyPromise<[R1, R2, R3, R4]>;
  static join<R1, R2, R3, R4, R5>(
    arg1: any | Promise<R1>,
    arg2: any | Promise<R2>,
    arg3: any | Promise<R3>,
    arg4: any | Promise<R4>,
    arg5: any | Promise<R5>,
    handler: (R1, R2, R3, R4, R5) => Promise<any> | any
  ): InvokableLazyPromise<[R1, R2, R3, R4, R5]>;

  static join(...args: Array<any | Promise<any> | GenericHandler>) {
    const handler = args[args.length - 1];
    const lazyAllPromises = lz(() => Promise.all(args.slice(0, -1)));
    return lazyAllPromises.then(results => handler(...results));
  }
}

export interface InvokableLazyPromise<T> extends Promise<T> {
  (): Promise<T>;
}

export function lz<T>(
  promiseCreator: () => Promise<T>
): InvokableLazyPromise<T> {
  let promise;

  const evaluate = <InvokableLazyPromise<T>>function() {
    if (!promise) {
      promise = promiseCreator();
    }
    return promise;
  };

  evaluate.then = (onFulfilled, onRejected) =>
    lz(() => evaluate().then(onFulfilled, onRejected));

  evaluate.catch = onRejected => lz(() => evaluate().catch(onRejected));

  evaluate.finally = onFinally => lz(() => evaluate().finally(onFinally));

  return evaluate;
}
