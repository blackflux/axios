import { expect } from 'chai';
import { describe } from 'node-tdd';
import { abbrev } from 'lambda-monitor-logger';
import index from '../src/index.js';

describe('Testing Package', {
  useNock: true,
  nockStripHeaders: true
}, () => {
  it('Testing export', () => {
    expect(typeof index).to.equal('function');
    expect(Object.entries(index)).to.deep.equal([]);
  });

  it('Testing request', async () => {
    const r = await index({ url: 'https://www.google.com', method: 'HEAD' });
    expect(r.status).to.equal(200);
  });

  it('Testing exception format', async ({ capture }) => {
    const url = 'https://google.com/unknown';
    const r = await capture(() => index({ url, method: 'HEAD' }));
    expect(JSON.parse(JSON.stringify(r))).to.deep.equal({
      message: '',
      name: 'Error',
      status: 404,
      config: {
        headers: { Accept: 'application/json, text/plain, */*', 'User-Agent': 'axios/0.27.2' },
        url: 'https://google.com/unknown',
        method: 'head'
      },
      code: 'ERR_BAD_REQUEST'
    });
    expect(abbrev(r)).to.deep.equal(
      '{ [AxiosError] code: \'ERR_BAD_REQUEST\',config:{ headers: { Accept: \'application/json,'
      + ' text/plain, */*\', \'User-Agent\': \'axios/0.27.2\' },url: \'https://google.com/unknown\',method:'
      + ' \'head\',data: undefined },response: { status: 404, statusText: null, headers: {}, data: \'\' } }'
    );
  });
});
