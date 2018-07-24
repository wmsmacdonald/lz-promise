import { lz, LazyPromise, InvokableLazyPromise } from "./lzPromise";
import * as sinon from "sinon";
import { expect } from "chai";

describe("lz", () => {
  it("should only call once after two evaluations", async () => {
    const fake = sinon.fake.returns(Promise.resolve("result"));

    const lazyValue = lz(fake);

    await lazyValue();
    await lazyValue();

    expect(fake.callCount).to.equal(1);
  });

  describe("then", () => {
    it("should change the resolved value to value returned in then", async () => {
      const lazyValue = lz(() => Promise.resolve("result"));

      const lazyChangedValue = (lazyValue as any).then(result => {
        expect(result).to.equal("result");
        return "changedResult";
      });

      expect(await lazyChangedValue()).to.equal("changedResult");
    });
  });
});

describe("join", () => {
  it("should call handler with results as arguments", () => {
    const lazyPromise1: InvokableLazyPromise<number> = lz(() =>
      Promise.resolve(1)
    );
    const lazyPromise2: InvokableLazyPromise<number> = lz(() =>
      Promise.resolve(2)
    );

    const lazyJoined: InvokableLazyPromise<[number, number]> = LazyPromise.join(
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
