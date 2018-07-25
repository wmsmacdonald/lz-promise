import { lz, LazyPromise } from "./lzPromise";
import * as sinon from "sinon";
import { expect } from "chai";

describe("LazyPromise", () => {
  describe('constructor', () => {
    it("should only call once after two evaluations", async () => {
      const fake = sinon.fake(resolve => resolve('result'));

      const lazyValue = new LazyPromise(fake);

      expect(fake.callCount).to.equal(0);

      await lazyValue();
      await lazyValue();

      expect(fake.callCount).to.equal(1);
    });
  });

  describe("then", () => {
    it("should change the resolved value to value returned in then", async () => {
      const lazyValue: LazyPromise<string> = lz(() => Promise.resolve("result"));

      const lazyChangedValue = lazyValue.then((result: string) => {
        expect(result).to.equal("result");
        return "changedResult";
      });

      const changedValue: string = await lazyChangedValue();
      expect(changedValue).to.equal("changedResult");
    });
  });
});

/*
describe("join", () => {
  it("should call handler with results as arguments", () => {
    const lazyPromise1: LazyPromise<number> = lz(() =>
      Promise.resolve(1)
    );
    const lazyPromise2: LazyPromise<number> = lz(() =>
      Promise.resolve(2)
    );

    const lazyJoined: LazyPromise<[number, number]> = LazyPromise.join(
      lazyPromise1,
      lazyPromise2,
      (value1: number, value2: number) => {
        expect(value1).to.equal(1);
        expect(value2).to.equal(2);
      }
    );

    lazyJoined.then(([value1, value2]) => {
      expect(value1).to.equal(1);
      expect(value2).to.equal(2);
    });

    LazyPromise.join()
  });
});
*/
