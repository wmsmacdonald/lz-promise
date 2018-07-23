import { lz } from './lzPromise';
import * as sinon from 'sinon';
import { expect } from 'chai';


describe('lz', () => {
  it('should only call once after two evaluations', async () => {
    const fake = sinon.fake.returns(Promise.resolve('result'));

    const lazyValue = lz(fake);

    await lazyValue();
    await lazyValue();

    expect(fake.callCount).to.equal(1);
  });

  describe('then', () => {
    it('should change the resolved value to value returned in then', async () => {
      const lazyValue = lz(() => Promise.resolve('result'));

      const lazyChangedValue = (lazyValue as any).then(result => {
        expect(result).to.equal('result');
        return 'changedResult';
      });


      expect(await lazyChangedValue()).to.equal('changedResult');
    });
  });
});
