export const join = (...args) => {
  const handler = args[args.length - 1];
  const lazyAllPromises = lz(() => Promise.all(args.slice(0, -1)));
  return (lazyAllPromises as any).then(results => handler(...results));
};

export const lz = promiseCreator => {
  let promise;

  const evaluate = () => {
    if (!promise) {
      promise = promiseCreator();
    }
    return promise;
  };

  evaluate['then'] = (onFulfilled, onRejected) =>
    lz(() => evaluate().then(onFulfilled, onRejected));

  evaluate['catch'] = onRejected => lz(() => evaluate().catch(onRejected));

  evaluate['finally'] = onFinally => lz(() => evaluate().finally(onFinally));

  return evaluate;
};
