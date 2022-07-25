import { expect } from 'chai';
import { describe } from 'node-tdd';
import wrap from '../../src/util/wrap.js';

describe('Testing wrap', () => {
  it('Testing async function', async ({ capture }) => {
    const wrapped = wrap(async () => {
      throw new Error('some-error');
    });
    const e = await capture(() => wrapped());
    expect(e.message).to.equal('some-error');
  });

  it('Testing function returning promise', async ({ capture }) => {
    const wrapped = wrap(() => Promise.reject(new Error('some-error')));
    const e = await capture(() => wrapped());
    expect(e.message).to.equal('some-error');
  });

  it('Testing boring function', async ({ capture }) => {
    const wrapped = wrap(() => 'ok');
    expect(wrapped()).to.equal('ok');
  });
});
