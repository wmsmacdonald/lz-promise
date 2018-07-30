import { lz, LazyPromise } from "./LazyPromise";
import * as sinon from "sinon";
import { expect } from "chai";
import { shim } from "promise.prototype.finally";
shim();

describe("LazyPromise", () => {
  describe("constructor", () => {
    it("executor should not be called after construction", async () => {
      const fake = sinon.fake();

      new LazyPromise(fake);

      expect(fake.callCount).to.equal(0);
    });
  });

  describe("then", () => {
    it("should call executor only once", async () => {
      const fake = sinon.fake(() => Promise.resolve("result"));

      const lazyValue: LazyPromise<string> = lz(fake);

      lazyValue.then();

      expect(fake.callCount).to.equal(1);

      lazyValue.then();

      expect(fake.callCount).to.equal(1);
    });
    it("should call executor only once", () => {
      const fake = sinon.fake(() => Promise.resolve("result"));

      const lazyValue: LazyPromise<string> = lz(fake);

      lazyValue.then();

      expect(fake.callCount).to.equal(1);

      lazyValue.then();

      expect(fake.callCount).to.equal(1);
    });
    it("should change value", async () => {
      const lazyValue: LazyPromise<string> = lz(() =>
        Promise.resolve("beginningResult")
      );

      const lazyChangedValue: number = await lazyValue.then<number>(() => 42);

      expect(lazyChangedValue).to.equal(42);
    });
    it("should handle rejection", async () => {
      const lazyRejection: LazyPromise<string> = lz(() =>
        Promise.reject("beginningError")
      );

      const lazyChangedValue: number = await lazyRejection.then<never, number>(
        null,
        () => 42
      );

      expect(lazyChangedValue).to.equal(42);
    });
  });
  describe("catch", () => {
    it("should handle rejection", async () => {
      const lazyRejection: LazyPromise<string> = lz(() =>
        Promise.reject("beginningError")
      );

      const lazyChangedValue: number | string = await lazyRejection.catch<
        number
      >(() => 42);

      expect(lazyChangedValue).to.equal(42);
    });
  });
  describe("finally", () => {
    it("should execute after resolve", async () => {
      const fake = sinon.fake();
      const lazyValue: LazyPromise<string> = lz(() =>
        Promise.resolve("beginningResult")
      );

      await lazyValue.finally(fake);

      expect(fake.calledOnce);
    });
    it("should execute after reject", async () => {
      const fake = sinon.fake();
      const lazyRejection: LazyPromise<string> = lz(() =>
        Promise.reject("beginningError")
      );

      try {
        await lazyRejection.finally(fake);
      } catch (e) {
        expect(e).to.equal("beginningError");
      }

      expect(fake.calledOnce);
    });
  });
  describe('resolve', () => {
    it("should resolve to value", async () => {
      const result: string = await LazyPromise.resolve<string>('result');
      expect(result).to.equal('result');
    });
  });
  describe('reject', () => {
    it("should reject to value", async () => {
      try {
        await LazyPromise.reject<string>('error');
        expect.fail('should throw error');
      }
      catch(e) {
        expect(e).to.equal('error');
      }
    });
  });
  describe('all', () => {
    it("should only call executor after .then", async () => {
      const fake = sinon.fake(() => Promise.resolve('result'));
      LazyPromise.all([lz(fake)]);
      expect(fake.calledOnce).to.be.false;

      await LazyPromise.all([lz(fake)]);
      expect(fake.calledOnce).to.be.true;
    });
  });
  describe('race', () => {
    it("should only call executor after .then", async () => {
      const fake = sinon.fake(() => Promise.resolve('result'));
      LazyPromise.race([lz(fake)]);
      expect(fake.calledOnce).to.be.false;

      await LazyPromise.race([lz(fake)]);
      expect(fake.calledOnce).to.be.true;
    });
  });
});

