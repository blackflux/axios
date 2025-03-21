import { expect } from 'chai';
import { describe } from 'node-tdd';
import { abbrev } from 'lambda-monitor-logger';
import axios from 'axios';
import index from '../src/index.js';

describe('Testing Package', {
  useNock: true,
  nockStripHeaders: true
}, () => {
  it('Testing export', () => {
    expect(typeof index).to.equal('function');
    const normalize = (obj) => ({
      type: typeof obj,
      children: Object.entries(obj).map(([k, v]) => [k, typeof v])
    });
    expect(normalize(index)).to.deep.equal(normalize(axios));
  });

  it('Testing request', async () => {
    const r = await index({ url: 'https://www.google.com', method: 'HEAD' });
    expect(r.status).to.equal(200);
  });

  it('Testing post request without body', async () => {
    const r = await index({
      url: 'https://www.google.com',
      method: 'POST',
      qs: { bling: 'one' }
    });
    expect(r.status).to.equal(200);
  });

  it('Testing exception format', async ({ capture }) => {
    const url = 'https://google.com/unknown';
    const r = await capture(() => index({ url, method: 'HEAD' }));
    expect(JSON.parse(JSON.stringify(r))).to.deep.equal({
      message: 'Request failed with status code 404',
      name: 'Error',
      status: 404,
      config: {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, compress, deflate, br',
          'User-Agent': 'axios/1.7.9'
        },
        url: 'https://google.com/unknown',
        method: 'head'
      },
      code: 'ERR_BAD_REQUEST'
    });
    expect(abbrev(r)).to.deep.equal(
      "{ [AxiosError: Request failed with status code 404] code: 'ERR_BAD_REQUEST',config:{ headers:Object "
      + "[AxiosHeaders] { Accept: 'application/json, text/plain, */*','Content-Type': undefined,'User-Agent': "
      + "'axios/1.7.9','Accept-Encoding': 'gzip, compress, deflate, br' },url: 'https://google.com/unknown',"
      + "method: 'head',data: undefined },response: { status: 404, statusText: null, headers: Object [AxiosHeaders] {}"
      + ", data: '' },status: 404 }"
    );
  });
});
