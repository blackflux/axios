import { expect } from 'chai';
import { describe } from 'node-tdd';
import index from '../src/index.js';

describe('Testing Package', { useNock: true }, () => {
  it('Testing export', () => {
    expect(typeof index).to.equal('function');
    expect(Object.entries(index)).to.deep.equal([]);
  });

  it('Testing request', async () => {
    const r = await index({ url: 'https://www.google.com', method: 'HEAD' });
    expect(r.status).to.equal(200);
  });
});
