import { expect } from 'chai';
import index from '../src/index.js';

describe('Testing Package', () => {
  it('Testing export', () => {
    expect(typeof index).to.equal('function');
    expect(Object.entries(index)).to.deep.equal([]);
  });
});
